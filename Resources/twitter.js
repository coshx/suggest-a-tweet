// sample of what we need to request
// https://api.twitter.com/1/statuses/user_timeline.json?include_entities=true&include_rts=true&screen_name=twitterapi&count=200
// so we just need to fill in the screen name bit and the rest should be handled

// on android we can't do nearly as many tweets as crunching the numbers takes a really long time
// so android => 50, iOS => 200 (max allowed is 200)
var tweetCount = 200;
if(ON_ANDROID){ tweetCount = 50; }

var getTweetsForUser = function(userName) {
  var request = "https://api.twitter.com/1/statuses/user_timeline.json?include_entities=true&include_rts=true&screen_name="
  request += userName;
  request += "&count=" + tweetCount;
  
  var c = Ti.Network.createHTTPClient(); // c for Client
  c.timeout = 10000;
  c.open("GET",request);
  
  c.onload = function() {
    Ti.API.info("in onload, got a success");
    try {
      Ti.API.info("Response text: " + this.responseText);
      obj = JSON.parse(this.responseText);
      parseTweets(obj);  
    } catch(e) {
      Ti.API.info(e);
      alert("Twitter not available, try again later."); // we get back a 'success' with non-JSON when Twitter can't service request
    }
  };
  
  c.onerror = function() {
    Ti.API.info("got an error when trying to get tweets");
    alert("Error in connecting to Twitter. Are you sure that's a real username?");
  };
  
  c.send(); // this is what actually causes the connection to run, not open  
};

var parseTweets = function(tweetsJSON) {
  var words = {};
  var totalWordCount = 0;
  
  try {
    for (var i = 0, length = tweetsJSON.length; i < length; i++) {
      // get the count of all the words in all the tweets into the words object
      // must do this in a function scope or else the binding of i gets all out of whack
      (function(){
        var tweet = tweetsJSON[i];
        var text = tweet.text;
        var wordsInText = text.split(" ");
        for (var j = 0, length = wordsInText.length; j < length; j++ ) {
          word = wordsInText[j].toLowerCase(); // case sensitive messes up matching, so all lower
          word = word.replace(/[^\w#@]/g, ""); // get rid of all non-word characters except # and @ since those mean something specific in Tweets
          if (wordsToSkip.indexOf(word) !== -1) {continue;} // if it's in the words to skip, don't count it
          
          totalWordCount += 1;
          if(word.length < 1 || words[word] === undefined) {
            words[word] = 1;
          } else {
            words[word]++;
          }
        }
        var user = tweet.user.screen_name;
      })();
      
      // now make values that can be used as rows in a table out of the things in words
      // rows need a title, hasChild to be true (to get the arrow on the right), and a count
      values = [];
      for(word in words) {
        values.push({
          title: word,
          hasChild: true,
          count: words[word]
        });
      }
    }
    
    // take a gander at suggestion_window.js to see the event handler
    Ti.API.fireEvent("tweetsLoaded", {
      success: true,
      values: values,
      wordCount: totalWordCount
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
  "of", "lot", "its", "says", "will" 
];
