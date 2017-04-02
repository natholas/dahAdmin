app.directive('footer', function() {
  return {
    limit: 'A',
    templateUrl: 'directives/footer/footer.html',
    link: function(scope) {
      scope.currentDate = new Date();
    }
  }
});
