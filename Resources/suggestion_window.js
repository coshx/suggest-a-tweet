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
  
      var testValues = [
        {title:'#lolcat', hasChild:true, count: 10},
        {title:'the', hasChild:true, count: 20},
        {title:'ZOMG', hasChild:true, count: 5},
        {title:'#wtf', hasChild:true, count: 8},
        {title:'#neatohashtag', hasChild:true, count: 1},
        {title:"日本語です。", hasChild:true, count: 2}
        ];
        
        testValues = sortSuggestionsByCount(testValues);
        
        suggestionTable.setData(testValues);
    })();  
  };
  
  suggestionScreen.add(suggestionTable);
  
  return suggestionScreen;
};


