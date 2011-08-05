// sample of what we need to request
// https://api.twitter.com/1/statuses/user_timeline.json?include_entities=true&include_rts=true&screen_name=twitterapi&count=200
// so we just need to fill in the screen name bit and the rest should be handled

var getTweetsForUser = function(userName) {
  var request = "https://api.twitter.com/1/statuses/user_timeline.json?include_entities=true&include_rts=true&screen_name="
  request += userName;
  request += "&count=2";
  
  var c = Ti.Network.createHTTPClient(); // c for Client
  c.timeout = 10000;
  c.open("GET",request);
  
  c.onload = function() {
    Ti.API.info("in onload, got a success");
    try {
      Ti.API.info(this.responseText);
      obj = JSON.parse(this.responseText);
      parseTweets(obj);  
    } catch(e) {
      Ti.API.info(e);
      alert("Twitter not available, try again later."); // we get back a 'success' with non-JSON when Twitter can't service request
    }
  };
  
  c.onerror = function() {
    Ti.API.info("got an error when trying to get tweets");
    alert("Error in connecting to Twitter.");
  };
  
  c.send(); // this is what actually causes the connection to run, not open  
};

var parseTweets = function(tweetsJSON) {
  values = [];
  try {
    for (var i = 0, length = tweetsJSON.length; i < length; i++) {
      (function(){
        var tweet = tweetsJSON[i];
        Ti.API.info("next tweet: " + tweet);
        var text = tweet.text;
        var user = tweet.user.screen_name;
        Ti.API.info("user: " + user + " text: " + text);
        values.push({
          title: text,
          hasChild: true,
          count: i
        });
      })();
    }
    
    Ti.API.fireEvent("tweetsLoaded", {
      success: true,
      values: values
    });
  } catch (e) {
    Ti.API.fireEvent("tweetsLoaded", {
      success: false
    });
  }
};
