// reworking of https://github.com/remy/twitterwall for Apps Script/Drive by @mhawksey
var FOLDERID = '0B6GkLMU9sHmLZUMyaWVWUnM3V0U';

/**
 * Gets latest tweets and dumps them in the data folder.
 */
function getSearchResults(){
  var folder = DriveApp.getFolderById(FOLDERID); // get folder
  var config_file = folder.getFilesByName('config.js').next(); //get config.js
  eval(config_file.getBlob().getDataAsString()); // eval to get config object
  
  // params 
  var params = { 
      q: config.search,
      count: 100,
      result_type: 'recent',
      include_entities: true
  };
  
  // get our data folder on Drive
  var data = getDriveFolderFromPath('history/data/', FOLDERID); 
  var search_idxs = data.getFilesByName('index.json'); // using a file to store some data
  if (!search_idxs.hasNext()){ // if doesn't exisit create file
    search_idxs = data.createFile('index.json', JSON.stringify({since_id:1, page: 0}), MimeType.JAVASCRIPT);
  } else {
    search_idxs = search_idxs.next();
  }
  
  // read some more files  
  var search_file = data.getFilesByName('search.json').next();
  var idx_data = JSON.parse(search_idxs.getBlob().getDataAsString());
  var since_id = idx_data.since_id;
  var page = idx_data.page;
  if (since_id){
    params.since_id = since_id;
  }
  
  // get some new data
  var tweets = getNewStatusUpdates(params);
  // increment the name on our existing file
  search_file.makeCopy('search'+page+'.json', data);
  // dump the new search results in new file
  search_file.setContent('callback(' + JSON.stringify(tweets) + ')');
  if (tweets[0] !== undefined){
    search_idxs.setContent(JSON.stringify({'since_id':tweets[0].id_str, 'page': page+1}));
  }
}

/**
 * Get new status updates from Twitter 
 * @param {String} sinceid of last tweet in archive.
 * @param {String} screen_name of archived account.
 * @return {Object} json object of Twitter updates binned in month objects yyyy_mm.
 */
function getNewStatusUpdates(params){
 
  // some variables
  var page = 1;
  var done = false;
  var output = [];
  var max_id = "";
  var max_id_url = "";
  while(!done){
    var responseData = TwtrService.get("search/tweets", params);
    if (responseData.message){
      Logger.log(responseData.message);
      done = true;
    } else {
      if (responseData.statuses !== undefined){
        var data = responseData.statuses;
      } else {
        var data = responseData;
      }
      if (data.length>0){ // if data returned
        if (data.length == 1 && data[0].id_str == max_id){ // catching if we've reached last new tweet
          done = true;
          break;
        }
        for (i in data){ // for the data returned we put in montly bins ready for writting/updating files
          if(data[i].id_str != max_id){
              output.push(data[i]); //push data to date bin
          }
        }
        if (data[data.length-1].id_str != max_id) { // more bad code trying to work out if next call with a max_id
          max_id = data[data.length-1].id_str;
          //max_id_url = "&max_id="+max_id;
          params.max_id = max_id;
        }
      } else { // if not data break the loop
        done = true;
      }
      page ++
      if (page > 16) done = true; // if collected 16 pages (the max) break the loop
    }
  }
  return output;
}

// Modified from http://ramblings.mcpher.com/Home/excelquirks/gooscript/driveapppathfolder
function getDriveFolderFromPath (path, root_id) {
  return (path || "/").split("/").reduce ( function(prev,current) {
    if (prev && current) {
      var fldrs = prev.getFoldersByName(current);
      return fldrs.hasNext() ? fldrs.next() : null;
    }
    else { 
      return current ? null : prev; 
    }
  },DriveApp.getFolderById(root_id)); 
}