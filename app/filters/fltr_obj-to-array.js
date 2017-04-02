app.filter('objToArray', function() {
  return function(obj) {
    if (!obj) return [];
    return Object.keys(obj).map(function (key) {return obj[key];});
  }
});
