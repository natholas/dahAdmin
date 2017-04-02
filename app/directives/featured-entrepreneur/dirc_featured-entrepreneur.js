app.directive('featuredEntrepreneur', function() {
  return {
    templateUrl: 'directives/featured-entrepreneur/featured-entrepreneur.html',
    controller: function($scope, Entrepreneurs) {
      Entrepreneurs.returnWhenLoaded().then(function() {
        $scope.entrepreneur = randomProperty(Entrepreneurs.entrepreneurs);
      });
    }
  }
});
