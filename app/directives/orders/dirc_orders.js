app.directive('orders', function() {
  return {
    limit: 'E',
    templateUrl: 'directives/orders/orders.html',
    scope: {orders: '=data', limit: '=?'},
    controller: function($scope, $rootScope) {
      $scope.backend_endpoint = $rootScope.backend_endpoint;
    }
  }
});
