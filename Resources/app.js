// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// use a debug tab if we want to run tests
var DEBUG = true;

var ON_ANDROID = false;
if(Ti.Platform.osname === "android") { ON_ANDROID = true; }

Ti.include(
  "twitter.js", // load Twitter-related functions
  "js_utilities.js", // assorted utility functions
  "test_tweet_values.js", // sample tweet values for testing
  "suggestion_detail_window.js", // load function to create the detail windows for suggestions
  "suggestion_window.js", // load function that will create the suggestions window
  "ui.js" // load the UI elements
); 

// if we're in debug mode, show the tabs, otherwise don't
if(DEBUG) {
  suggestTweetWindow.tabBarHidden = false;
  Ti.include("debug_test.js");  
}

tabGroup.open(); // show the UI and start
