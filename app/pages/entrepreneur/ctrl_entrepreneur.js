app.controller('entrepreneurCtrl', function($scope, entrepreneur, $rootScope) {

  $scope.backend_endpoint = $rootScope.backend_endpoint;
  $scope.entrepreneur = entrepreneur;

  $scope.getTemplate = function () {
    return entrepreneur ? 'pages/entrepreneur/entrepreneur.html' : 'pages/404/404.html';
  }

});
