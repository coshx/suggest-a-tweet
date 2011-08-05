//
// Twitter tableview in the analysisScreen

var sortWordsByCount = function (words) {      
  return words.sort(function(a, b) { // sorts so that things with a higher count show up higher in the table
    return b.count - a.count;
  });
};

var loadingLabel = Titanium.UI.createLabel({
  color:'#0AF',
  text:'Loading Tweets...\nThis can take a few minutes.',
  font:{fontSize:20,fontFamily:'Helvetica Neue'},
  //textAlign:'left',
  //left: 10,
  width:'auto',
  height:50,
  top:100
});

var loadingIndicator = Ti.UI.createActivityIndicator({
  top: 20,
  height: 30,
  width: "auto"
});

var analysisScreen = Titanium.UI.createWindow({  
  title:'Words & Frequency',
  backgroundColor:'#fff',
  //layout:'vertical',
  tabBarHidden: true,
  backButtonTitle: "Back"    
}); 

var searchBarHeight = 44;

var wordTable = Ti.UI.createTableView({
  top: searchBarHeight
});

// search bar code adapted from http://wiki.appcelerator.org/display/guides/Using+TableViews#UsingTableViews-TableViewuserinteractionandevents
var searchBar = Titanium.UI.createSearchBar({
  hintText:'Type to filter',
  showCancel:true,
  top:0,
  height: searchBarHeight
});

wordTable.search = searchBar;
wordTable.searchHidden = true;

wordTable.addEventListener('click', function(e) {
  mainTab.open(createDetailWindow(e.rowData, wordTable.wordCount));
});

if(DEBUG) { // fill in some test data if we're in debug mode
  Ti.API.info("adding test values to wordTable");
  (function () {  
    testValues = sortWordsByCount(testTweetValues);
    wordTable.setData(testValues);
  })();  
};

searchBar.addEventListener('change', function(e)
{
  // search rows for value of string as user types
  e.source.value;
});

searchBar.addEventListener('return', function(e)
{
  // dismiss the keypad when user presses return
  e.source.blur();
});

searchBar.addEventListener('cancel', function(e)
{
  // dismiss the keypad when user presses the cancel button
  e.source.blur();
});

analysisScreen.addEventListener("open", function(e) {
  getTweetsForUser(twitterNameInput.value.trim());
});

// when tweets are loaded, hide the 'loading' text, and show the table with the info
Ti.API.addEventListener("tweetsLoaded", function(e) {
  Ti.API.info("got tweetsLoaded");
  
  if(e.success === true) {
    loadingLabel.hide();
    loadingIndicator.hide();
    values = sortWordsByCount(e.values);
    wordTable.setData(values);
    wordTable.wordCount = e.wordCount;
    searchBar.show();      
    wordTable.show();
  } else {
    var alertDialog = Titanium.UI.createAlertDialog({
      title: 'Error',
      message: 'Unable to get Tweets.',
      buttonNames: ['Back']
    });
    alertDialog.addEventListener("click", function() {
      analysisScreen.close();
    });
    alertDialog.show();      
  }
});

// attach widgets to window once
var attachWidgetsToWindow = function() {
  analysisScreen.add(loadingLabel);
  analysisScreen.add(loadingIndicator);
  // on android we leave the bar as part of the table, on iOS we add it to the window
  if(ON_ANDROID) {
    wordTable.top = 0;
    wordTable.searchHidden = false;
  } else {
    analysisScreen.add(searchBar);  
  }  
  analysisScreen.add(wordTable);
};
// call it once to initially attach everything
(function() {attachWidgetsToWindow();}());

// needed on android to prevent blowing up
var removeWidgetsFromWindow = function(analysisScreen) {
  if(!ON_ANDROID) { return; }
  
  analysisScreen.remove(loadingLabel);
  analysisScreen.remove(loadingIndicator);
  analysisScreen.remove(wordTable);
}


// set initial visibilities of widgets when screen is opened and empty search bar
var setupAnalysisUI = function() {
  loadingLabel.show();
  loadingIndicator.show();
  searchBar.hide();
  wordTable.hide();
  searchBar.value = ""; 
};

// wrapping creation in function so we can easily reset the view to look how we want
var createAnalysisWindow = function() {
  setupAnalysisUI();    
  return analysisScreen;
};


