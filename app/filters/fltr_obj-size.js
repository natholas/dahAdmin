app.filter('objSize', function() {
  return function(obj) {
    if (!obj) return 0;
    return Object.keys(obj).length;
  }
});
