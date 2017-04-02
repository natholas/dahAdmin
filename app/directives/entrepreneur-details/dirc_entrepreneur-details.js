app.directive('entrepreneurDetails', function() {
  return {
    templateUrl: 'directives/entrepreneur-details/entrepreneur-details.html',
    scope: {entrepreneur: '=data'},
    controller: function($scope) {
      $scope.countries = {
        1: 'Uganda'
      };

      $scope.statuses = [
        'DRAFT',
        'LIVE',
        'FUNDED'
      ];

      $scope.convert = function () {
        console.log(1);
      }
    }
  }
});
