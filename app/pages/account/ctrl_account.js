app.controller('accountCtrl', function($scope, Account) {

  $scope.Account = Account;

  $scope.getTemplate = function () {
    return Account.loginToken ? 'pages/account/account.html' : 'pages/404/404.html';
  };

});
