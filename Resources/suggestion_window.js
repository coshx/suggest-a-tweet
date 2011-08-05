//
// Twitter tableview in the suggestionScreen

var sortSuggestionsByCount = function (suggestions) {      
  return suggestions.sort(function(a, b) { // sorts so that things with a higher count show up higher in the table
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

var suggestionScreen = Titanium.UI.createWindow({  
  title:'Words & Frequency',
  backgroundColor:'#fff',
  //layout:'vertical',
  tabBarHidden: true,
  backButtonTitle: "Back"    
}); 

var searchBarHeight = 44;

var suggestionTable = Ti.UI.createTableView({
  top: searchBarHeight
});

// search bar code adapted from http://wiki.appcelerator.org/display/guides/Using+TableViews#UsingTableViews-TableViewuserinteractionandevents
var searchBar = Titanium.UI.createSearchBar({
  hintText:'Type to filter',
  showCancel:true,
  top:0,
  height: searchBarHeight
});

suggestionTable.search = searchBar;
suggestionTable.searchHidden = true;

suggestionTable.addEventListener('click', function(e) {
  mainTab.open(createSuggestionDetailWindow(e.rowData, suggestionTable.wordCount));
});

if(DEBUG) { // fill in some test data if we're in debug mode
  Ti.API.info("adding test values to suggestionTable");
  (function () {  
    testValues = sortSuggestionsByCount(testTweetValues);
    suggestionTable.setData(testValues);
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

suggestionScreen.addEventListener("open", function(e) {
  getTweetsForUser(twitterNameInput.value.trim());
});

// when tweets are loaded, hide the 'loading' text, and show the table with the info
Ti.API.addEventListener("tweetsLoaded", function(e) {
  Ti.API.info("got tweetsLoaded");
  
  if(e.success === true) {
    loadingLabel.hide();
    loadingIndicator.hide();
    values = sortSuggestionsByCount(e.values);
    suggestionTable.setData(values);
    suggestionTable.wordCount = e.wordCount;
    searchBar.show();      
    suggestionTable.show();
  } else {
    var alertDialog = Titanium.UI.createAlertDialog({
      title: 'Error',
      message: 'Unable to get Tweets.',
      buttonNames: ['Back']
    });
    alertDialog.addEventListener("click", function() {
      suggestionScreen.close();
    });
    alertDialog.show();      
  }
});

// attach widgets to window once
var attachWidgetsToWindow = function() {
  suggestionScreen.add(loadingLabel);
  suggestionScreen.add(loadingIndicator);
  // on android we leave the bar as part of the table, on iOS we add it to the window
  if(ON_ANDROID) {
    suggestionTable.top = 0;
    suggestionTable.searchHidden = false;
  } else {
    suggestionScreen.add(searchBar);  
  }  
  suggestionScreen.add(suggestionTable);
};
// call it once to initially attach everything
(function() {attachWidgetsToWindow();}());

// needed on android to prevent blowing up
var removeWidgetsFromWindow = function(suggestionScreen) {
  if(!ON_ANDROID) { return; }
  
  suggestionScreen.remove(loadingLabel);
  suggestionScreen.remove(loadingIndicator);
  suggestionScreen.remove(suggestionTable);
}


// set initial visibilities of widgets when screen is opened and empty search bar
var setupSuggestionUI = function() {
  loadingLabel.show();
  loadingIndicator.show();
  searchBar.hide();
  suggestionTable.hide();
  searchBar.value = ""; 
};

// wrapping creation in function so we can easily reset the view to look how we want
var createSuggestionWindow = function() {
  setupSuggestionUI();    
  return suggestionScreen;
};


