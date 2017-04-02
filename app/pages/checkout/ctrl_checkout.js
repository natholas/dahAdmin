app.controller('checkoutCtrl', function($scope, order, Checkout, Account) {
  $scope.getTemplate = function () {
    return order ? 'pages/checkout/checkout.html' : 'pages/404/404.html';
  };
  $scope.order = order;
  $scope.Checkout = Checkout;
  $scope.Account = Account;
  $scope.donationAmounts = [
    1, 2, 5, 10, 50, 100, 500, 1000
  ];
});
