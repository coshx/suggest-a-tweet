var createSuggestionDetailWindow = function(suggestionRow) {
  var text = suggestionRow.title;
  
  var win = Ti.UI.createWindow({
    title:text,
    layout:'vertical',
    backgroundColor: "#fff"
  });
  
  var countLabel = Ti.UI.createLabel({
    text: "Number of occurrences: " + suggestionRow.count,
    top: 10,
    height: "auto",
    textAlign:'left',
    font: {
      fontWeight:'bold',
      fontSize:18
    }
  });
  
  win.add(countLabel);
 
  return win;
};