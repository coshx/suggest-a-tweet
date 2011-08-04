// sample of what we need to request
// https://api.twitter.com/1/statuses/user_timeline.json?include_entities=true&include_rts=true&screen_name=twitterapi&count=200
// so we just need to fill in the screen name bit and the rest should be handled

var getTweetsForUser = function(userName, callback, errorCallback) {
  var request = "https://api.twitter.com/1/statuses/user_timeline.json?include_entities=true&include_rts=true&screen_name="
  request += userName;
  request += "&count=200";
  
  var c = Ti.Network.createHTTPClient(); // c for Client
  c.timeout = 10000;
  c.open("GET",request);
  
  c.onload = function() {
    Ti.API.info("in onload, got a success");
    //Ti.API.info(this.responseText);
    callback(this.responseText);
  };
  
  c.onerror = function() {
    Ti.API.info("got an error when trying to get tweets");
    errorCallback(this);
  };
  
  c.send(); // this is what actually causes the connection to run, not open  
};
