app.filter('age', function() {
  return function(dob) {

    var diff = new Date().getTime() - dob.getTime();
    return Math.floor(diff / 1000 / 60 / 24 / 365);
  }
});
