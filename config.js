var config = {
  // Twitter API (Proxy) URL
  baseUrl: 'https://googledrive.com/host/0B6GkLMU9sHmLZUMyaWVWUnM3V0U/',

  debug: true,
  title: 'Twitter wall built by @rem',

  search: '#altc', // 'from:@fullfrontalconf OR @fullfrontalconf OR #fullfrontalconf OR #fullfrontal2011 OR full-frontal.org OR #fullfrontal11',
  list: 'fullfrontalconf/delegates11', // mhawksey - not implemented in this example 

  timings: {
    showNextScheduleEarlyBy: '5m', // show the next schedule 10 minutes early
    defaultNoticeHoldTime: '10s',
    showTweetsEvery: '3s'
  }
};

// allows reuse in the node script
if (typeof exports !== 'undefined') {
  module.exports = config;
}
