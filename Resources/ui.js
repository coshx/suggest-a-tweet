/**
 * @author Dave Kapp
 */

// create tab group
var tabGroup = Titanium.UI.createTabGroup();

//
// create base UI tab and root window
//
var suggestTweetWindow = Titanium.UI.createWindow({  
    title:'TweetAlyzer',
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
    title:'TweetAlyzer',
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
  hintText: "Twitter Name",
  height: 45,
  top: 10,
  width: 250,
  borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED
});

twitterNameInput.addEventListener('blur', function(e) {
  twitterNameInput.blur();
});

var okButton = Titanium.UI.createButton({
  title:"Analyze Tweets",
  width:250,
  height:30,
  top: 10
});

okButton.addEventListener('click', function(e) {
  mainTab.open(createSuggestionWindow());
}); 

suggestTweetWindow.add(twitterNameLabel);
suggestTweetWindow.add(twitterNameInput);
suggestTweetWindow.add(okButton);


//
//  add tabs
//
tabGroup.addTab(mainTab);
tabGroup.addTab(debugTab);
