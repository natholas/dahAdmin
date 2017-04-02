app.controller('entrepreneurCtrl', function($scope, entrepreneur) {

  $scope.entrepreneur = entrepreneur;

  $scope.getTemplate = function () {
    return entrepreneur ? 'pages/entrepreneur/entrepreneur.html' : 'pages/404/404.html';
  }

});
