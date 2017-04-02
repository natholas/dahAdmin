app.directive('investedEntrepreneurs', function() {
  return {
    limit: 'E',
    templateUrl: 'directives/invested-entrepreneurs/invested-entrepreneurs.html',
    scope: {investedEntrepreneurs: '=data', limit: '=?'},
    controller: function($scope, $rootScope) {
      $scope.backend_endpoint = $rootScope.backend_endpoint;
    }
  }
});
