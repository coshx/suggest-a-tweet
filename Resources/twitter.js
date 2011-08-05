// sample of what we need to request
// https://api.twitter.com/1/statuses/user_timeline.json?include_entities=true&include_rts=true&screen_name=twitterapi&count=200
// so we just need to fill in the screen name bit and the rest should be handled

var getTweetsForUser = function(userName) {
  var request = "https://api.twitter.com/1/statuses/user_timeline.json?include_entities=true&include_rts=true&screen_name="
  request += userName;
  request += "&count=200";
  
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
  words = {};
  try {
    for (var i = 0, length = tweetsJSON.length; i < length; i++) {
      // get the count of all the words in all the tweets into the words object
      (function(){
        var tweet = tweetsJSON[i];
        var text = tweet.text;
        wordsInText = text.split(" ");
        for (var j = 0, length = wordsInText.length; j < length; j++ ) {
          word = wordsInText[j].toLowerCase();
          word = word.replace(/[^\w#@]/g, ""); // get rid of all non-word characters except # and @
          if (wordsToSkip.indexOf(word) !== -1) {continue;}
          if(word.length < 1 || words[word] === undefined) {
            words[word] = 1;
          } else {
            words[word]++;
          }
        }
        var user = tweet.user.screen_name;
      })();
      
      // now make values that can be used as rows in a table out of the things in words
      values = [];
      for(word in words) {
        values.push({
          title: word,
          hasChild: true,
          count: words[word]
        });
      }
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

var wordsToSkip = [
  "the", "for", "and", "is", "it", "that", "but",
  "a", "on", "have", "at", "was", "with", "be",
  "in", "as", "get", "so", "this", "an", "all",
  "to", "had", "are", "has", "did", "or", "got",
  " ", "by", "it", "thats", "from", "than", "before",
  "of", "lot"
];
