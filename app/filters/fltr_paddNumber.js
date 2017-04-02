app.filter('paddNumber', function() {
  return function(val, length) {
    val = val.toString();
    while (val.length < length) val = "0" + val;
    return val;
  }
});
