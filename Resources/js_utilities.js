// courtesy of http://stackoverflow.com/questions/498970/how-to-trim-a-string-in-javascript
String.prototype.trim = function() {
  leftTrimmed = this.replace(/^\s+/,'');
  return leftTrimmed.replace(/\s+$/,'');
};
