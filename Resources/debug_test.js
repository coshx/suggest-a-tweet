var printResponse = function(response) {
  Ti.API.info("in printResponse");
  //Ti.API.info(response);
};

var testTwitter = (function() {
  Ti.API.info("calling getTweetsForUser...");
  getTweetsForUser("HappyMrDave");
});
//();

