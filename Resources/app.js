// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// use a debug tab if we want to run tests
var DEBUG = true;

Ti.include("twitter.js"); // load Twitter-related functions
Ti.include("ui.js"); // load the UI elements

// if we're in debug mode, show the tabs, otherwise don't
if(DEBUG) {
  suggestTweetWindow.tabBarHidden = false;
  Ti.include("debug_test.js");  
}

tabGroup.open(); // show the UI and start
