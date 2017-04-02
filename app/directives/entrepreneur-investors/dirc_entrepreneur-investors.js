app.directive('entrepreneurInvestors', function() {
  return {
    templateUrl: 'directives/entrepreneur-investors/entrepreneur-investors.html',
    scope: {entrepreneur: '=data'},
    controller: function($scope) {
      $scope.entrepreneur.getInvestors();
    }
  }
});
