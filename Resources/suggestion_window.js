//
// Twitter tableview in the suggestionScreen

var sortSuggestionsByCount = function (suggestions) {      
  return suggestions.sort(function(a, b) { // sorts so that things with a higher count show up higher in the table
    Ti.API.info(b.count - a.count);
    return b.count - a.count;
  });
};

// need to wrap creation in function because nothing can be added to the window until it is opened
var createSuggestionWindow = function() {
  
  var loadingLabel = Titanium.UI.createLabel({
    color:'#0AF',
    text:'Loading Tweets...',
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

  var suggestionTable = Ti.UI.createTableView();
  
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
  
  // start off with the loading text and the indicator, then when tweets are loaded, change to the table
  suggestionScreen.add(loadingLabel);
  suggestionScreen.add(loadingIndicator);
  suggestionTable.hide();  
  suggestionScreen.add(suggestionTable);
  
  suggestionScreen.addEventListener("open", function(e) {
    getTweetsForUser(twitterNameInput.value.trim());
  });
  
  Ti.API.addEventListener("tweetsLoaded", function(e) {
    if(e.success === true) {
      loadingLabel.hide();
      loadingIndicator.hide();
      values = sortSuggestionsByCount(e.values);
      suggestionTable.setData(values);      
      suggestionTable.show();
    } else {
      suggestionScreen.close();
      alert("Could Not Read Tweets");      
    }
  });
  
  return suggestionScreen;
};


