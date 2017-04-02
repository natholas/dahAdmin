app.directive('entrepreneurDetails', function() {
  return {
    templateUrl: 'directives/entrepreneur-details/entrepreneur-details.html',
    scope: {entrepreneur: '=data'},
    controller: function($scope) {
      $scope.amounts = [
        10,
        15,
        20,
        50,
        100,
        150,
        200,
        1000
      ];

      for (var i = 0; i < $scope.amounts.length; i ++) {
        if ($scope.amounts[i] >= $scope.entrepreneur.stillNeeded) {
          $scope.amounts.splice(i, 1);
          i -= 1;
        }
      }
      $scope.amounts.push($scope.entrepreneur.stillNeeded);

      $scope.investmentAmount = $scope.amounts[0];
    }
  }
});
