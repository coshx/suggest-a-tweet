var createSuggestionDetailWindow = function(suggestionRow, wordCount) {
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
  
  var percentage = (suggestionRow.count / wordCount) * 100;
  var percentageLabel = Ti.UI.createLabel({
    text: "Percentage of words: " + percentage.toFixed(3),
    top: 10,
    height: "auto",
    textAlign:'left',
    font: {
      fontWeight:'bold',
      fontSize:18
    }
  });
  
  win.add(countLabel);
  win.add(percentageLabel);
 
  return win;
};