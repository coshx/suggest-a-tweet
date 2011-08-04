var createSuggestionDetailWindow = function(suggestionRow) {
  var text = suggestionRow.title;
  var win = Ti.UI.createWindow({
    title:text,
    layout:'vertical',
    backgroundColor: "#fff"
  });
  
  var suggestionLabel = Ti.UI.createLabel({
    text:text,
    top:10,
    textAlign:'center',
    font: {
      fontWeight:'bold',
      fontSize:18
    },
    height:'auto'
  });
  
  var countLabel = Ti.UI.createLabel({
    text: 27, // count here
    top: 10,
    textAlign: "left",
    height: "auto"
  });
  
  win.add(suggestionLabel);
  win.add(countLabel);
 
  return win;
};