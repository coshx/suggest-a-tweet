/**
 * @author Dave Kapp
 */

// create tab group
var tabGroup = Titanium.UI.createTabGroup();

//
// create base UI tab and root window
//
var suggestTweetWindow = Titanium.UI.createWindow({  
    title:'Suggest-A-Tweet',
    backgroundColor:'#fff',
    layout:'vertical',
    tabBarHidden: true,    
});

// debugging stuff
  var debugWin = Titanium.UI.createWindow({  
    title:'DEBUG',
    backgroundColor:'#fff'
  });
   
  var debugTab = Titanium.UI.createTab({
    icon:'KS_nav_views.png',
    title:'DEBUG',
    window: debugWin
  });  
 
var mainTab = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'Suggest-A-Tweet',
    window:suggestTweetWindow
});

var twitterNameLabel = Titanium.UI.createLabel({
  //color:'#999',
  text:'Twitter Name',
  //font:{fontSize:20,fontFamily:'Helvetica Neue'},
  //textAlign:'left',
  //left: 10,
  width:'auto',
  height:30,
  top:10
});

var twitterNameInput = Titanium.UI.createTextField({
  hintText: "BillyJoeBob",
  height: 45,
  top: 10,
  width: 250,
  borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED
});

twitterNameInput.addEventListener('blur', function(e) {
  twitterNameInput.blur();
});

var okButton = Titanium.UI.createButton({
  title:"Get Suggestions",
  width:250,
  height:30,
  top: 10
});

okButton.addEventListener('click', function(e) {
  mainTab.open(createSuggestionScreen());
}); 

suggestTweetWindow.add(twitterNameLabel);
suggestTweetWindow.add(twitterNameInput);
suggestTweetWindow.add(okButton);

//
// Twitter tableview in the suggestionScreen
// need to wrap creation in function because nothing can be added to the window until it is opened
//
var createSuggestionScreen = function() {
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
        {title:'#lolcat', hasChild:true},
        {title:'the', hasChild:true},
        {title:'ZOMG', hasChild:true},
        {title:'#wtf', hasChild:true},
        {title:'#neatohashtag', hasChild:true},
        {title:"日本語です。", hasChild:true}
        ];
        
        suggestionTable.setData(testValues);
    })();  
  };
  suggestionScreen.add(suggestionTable);
  
  return suggestionScreen;
};


//
//  add tabs
//
tabGroup.addTab(mainTab);
tabGroup.addTab(debugTab);

