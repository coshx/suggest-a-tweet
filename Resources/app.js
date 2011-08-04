// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// use a debug tab if we want to run tests
var DEBUG = false;

// create tab group
var tabGroup = Titanium.UI.createTabGroup();


//
// create base UI tab and root window
//
var win1 = Titanium.UI.createWindow({  
    title:'Suggest-A-Tweet',
    backgroundColor:'#fff'
});

if(DEBUG) {
  var debugWin = Titanium.UI.createWindow({  
    title:'DEBUG',
    backgroundColor:'#fff'
  });
   
	var debugTab = Titanium.UI.createTab({
    icon:'KS_nav_views.png',
    title:'DEBUG',
    window: debugWin
	});
	
  tabGroup.addTab(debugTab);	
}
 
var tab1 = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'Tab 1',
    window:win1
});

var label1 = Titanium.UI.createLabel({
	color:'#999',
	text:'I am Window 1',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto'
});

win1.add(label1);

//
// create controls tab and root window
//
var win2 = Titanium.UI.createWindow({  
    title:'Tab 2',
    backgroundColor:'#fff'
});
var tab2 = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'Tab 2',
    window:win2
});

var label2 = Titanium.UI.createLabel({
	color:'#999',
	text:'I am Window 2',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto'
});

win2.add(label2);



//
//  add tabs
//
tabGroup.addTab(tab1);  
tabGroup.addTab(tab2);  


// if we're in debug mode, use the tabs, otherwise, just show the app
if(DEBUG) {
  tabGroup.open();  
} else {
  win1.open();
}

