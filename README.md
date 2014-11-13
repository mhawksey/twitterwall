# A conference twitter wall with built in schedule & announcements

![Example of 2010 conference wall](http://i.imgur.com/LdPaw.png)

This twitter wall is preloaded with the [Full Frontal JavaScript Conference](http://full-frontal.org) details, but is easy to change and customise.

JavaScript customisation happens in `config.js` and style customisations in `custom.css`.

## Also available as a service

If setting this up yourself is tricky or too much work, or even beyond your skill (I appreciate not everyone who runs a conference is going to be happy to code too), we're offering a full service with similar (but more) functionality at http://confwall.com. Please check it out - also available for free to free events.

## Running the wall

Due to Twitter API 1.1 changes, the twitter wall requires a Twitter API proxy. The proxy allows you to make requests to Twitter's API from the browser. If you're a Node user, you can use Left Logic's [twitter-proxy](https://github.com/leftlogic/twitter-proxy). Whatever proxy you choose to use, you need to tell the wall about it. To do so, modify the `baseUrl` in config.js.

## Tweets

The twitter wall is able to both search for tweets and source tweets from a twitter list (though this is optional).

In the `config.js` you will want to set some values:

- `search` is the same string you would search twitter for to find tweets about your conference. The example provided in the `config.js` you can see includes multiple search phrases, so don't be coy!
- `list` allows you to curate a list on twitter of all your attendees and capture those tweets mixed in with the search results. This is an optional value.
- `timings.showTweetsEvery` gives you control of when to show each new tweet. The way this app works is collects (about 200) tweets in one go, then gradually shows them all, this `showTweetsEvery` value controls the rate that they're shown. The value must be in a valid timing value (see below)

To customise the HTML for the individual tweets, find the template in `index.html` and edit `#tweet_template`.

## Saving tweets

I've included a simple [Node](http://nodejs.org) app that will capture tweets as files both for debugging later, but also so you have a backup copy of all the tweets from the day (or days):

    $ cd history
    $ node server.js

This will read the `config.js` file and capture the tweets in the `history/data` directory.  Setting the `debug` flag will then make use of these tweets and ignore the `search` value.

## Timing values

A timing values are simply strings that are converted to JavaScript times. Simple to understand (I hope):

- "10m" is 10 minutes
- "5.5m" is 5 minutes, 30 seconds (as it's a floating point, and not minutes and seconds)
- "1h" is 1 hour
- "10s" is 10 seconds
- "100ms" is 100 milliseconds

## Schedule

Open `index.html` and find the `#schedule` element. All the `div`s inside are rotated throughout the day. The important attribute is the `data-time` value. This is set to a 24 hour clock in hours and minutes so that 3:45pm is represented as `<div data-time="1545">`.

When the app starts it will automatically find the schedule element that is due next. By default it will show the next schedule exactly on time, but you can customise this using the `config.js` settings. Change `timings.showNextScheduleEarlyBy` to a timing value (like `10m`) which will show the next schedule 10 minutes ahead of when it's due.

This is useful for when you have talks going on and the screen is being used for slides. Once the talk is finished, you can switch back to the twitter wall and it will be all set to show the next talk.

Edit the `custom.css` to give your own branded feel to the schedule.

Finally, if you wish to use a full sized background image on the schedule, the current time is applied to the `#schedule` element, which can be used in `custom.css`:

    #schedule[data-time="0940"] {
      background-image: url(/images/sample/remy.jpg);
    }

In the example above the schedule time matches the time in the `data-time` property for *Remy* speaking, so the `#schedule` element has it's `background-image` set.

## Notices

This is a useful area to show sponsors and messages for the conference. Inside `index.html` find the `#notices` element and all the `div`s inside are rotated.  Each notice is shown for the amount of time set in `custom.js` value `timings.defaultNoticeHoldTime`, but this can be customised for specific notices individually.

A notice is simply a `div` element. This can hold images, text and so on. To add a custom hold time, add the following attribute: `data-hold-time="20s"`. This will show that particular notice for 20 seconds.

To make the notice appear over the entire app, add a class of `fullscreen`. By default this will overlay the entire screen, but if you want to animate this in place, edit the `custom.css` and edit the `fullscreen` class so the notice is *offscreen*, but make sure to restore the value when it's being shown. For example, if the `#notice3` element should be fullscreen and slide up from the bottom of the screen:

    #notices .fullscreen {
      top: 100%;
    }

    #notice3.show {
      top: 0;
    }

Note that the `#notice3` element has the `show` class and the `top` value is set to `0`. As all the notice elements have animations set on all properties, so the animations should work.

## Layout

By default the twitter wall takes up full height on the right, but if you edit `index.html` it's simple to rearrange the elements to suit your needs.  Also look at the `hflex-wrapper` and other flex-box styles in `app/screen.css` to see more layout options.

## Debugging

Be wary the more you test this, it's possible to get blocked by Twitter's rate limit. For that, I've included a `debug` flag in the `config.js` that will read static tweets (about my own conference, sorry) to populate the twitter wall.

## In the wild

Let me know if you've used this project at your conference and I'll include it below (and feel free to send a pic - it's good for the ego!). So far:

- [Full Frontal JS conf](http://full-frontal.org)
- Chirp (twitter's first conference) ([pic](http://twitpic.com/1fmeuu))
- [beyond tellerrand 2011](http://2011.beyondtellerrand.com)
- [btPLAY 2012](http://play12.beyondtellerrand.com) ([pic1](http://farm6.staticflickr.com/5034/7112179285_84ee84f1a3_z.jpg) & [pic2](http://farm8.staticflickr.com/7037/7128059037_bdebfe7937_z.jpg))
- Reasons to be Appy ([pic1](http://farm4.staticflickr.com/3666/10582556835_4bac49f24f_b.jpg), [pic2](http://farm4.staticflickr.com/3816/10582561915_84e7b1d448_b.jpg), [pic3](http://farm4.staticflickr.com/3778/10582609074_3a1e31260d_b.jpg))
- [beyond tellerrand 2012](http://2012.beyondtellerrand.com) ([pic1](http://farm9.staticflickr.com/8480/8221718069_a73a5ab015_o.jpg) & [pic2](http://farm9.staticflickr.com/8197/8219459243_74ba503dea_o.jpg))
- [All Your Base 2012](http://allyourbaseconf.com/2012/) ([pic1](http://farm6.staticflickr.com/5493/10582898233_2069b69685_b.jpg), [pic2](http://farm4.staticflickr.com/3750/10582906763_f22d4262c0_b.jpg), [screen capture](http://vimeo.com/78026516))
- [jQuery UK 2013](http://events.jquery.org/2013/uk/) ([pic1](http://farm4.staticflickr.com/3670/10582663285_4e42e21155_b.jpg), [pic2](http://farm3.staticflickr.com/2814/10582740174_0d35b2cc71_b.jpg), [pic3](http://farm6.staticflickr.com/5495/10582691656_a028a53c8c_b.jpg))
- [All Your Base 2013](http://allyourbaseconf.com/) ([pic1](http://farm6.staticflickr.com/5496/10742461514_6326700e9a_b.jpg), [pic2](http://farm4.staticflickr.com/3780/10582771975_23b8d4eb21_b.jpg), [pic3](http://farm8.staticflickr.com/7360/10583050753_0d32588ab5_b.jpg))

## Feedback

Please do raise any issues, or even better, send a pull request to improve this project.
