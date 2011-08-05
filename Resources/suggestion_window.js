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
  title:'Suggestions',
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

suggestionTable.addEventListener('click', function(e) {
  mainTab.open(createSuggestionDetailWindow(e.rowData));
});

if(DEBUG) { // fill in some test data if we're in debug mode
  Ti.API.info("adding test values to suggestionTable");
  (function () {  
    testValues = sortSuggestionsByCount(testTweetValues);
    suggestionTable.setData(testValues);
  })();  
};

suggestionTable.search = searchBar;
suggestionTable.searchHidden = true;

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

Ti.API.addEventListener("tweetsLoaded", function(e) {
  if(e.success === true) {
    loadingLabel.hide();
    loadingIndicator.hide();
    values = sortSuggestionsByCount(e.values);
    suggestionTable.setData(values);
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

// need to wrap creation in function because nothing can be added to the window until it is opened
var createSuggestionWindow = function() {

  // start off with the loading text and the indicator, then when tweets are loaded, change to the table
  suggestionScreen.add(loadingLabel);
  suggestionScreen.add(loadingIndicator);
  searchBar.hide();
  suggestionScreen.add(searchBar);
  suggestionTable.hide();  
  suggestionScreen.add(suggestionTable);
  
  return suggestionScreen;
};


