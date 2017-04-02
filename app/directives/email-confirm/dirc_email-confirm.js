app.directive('emailConfirm', function() {
  return {
    templateUrl: 'directives/email-confirm/email-confirm.html',
    controller: function($scope, $location, Network) {
      $scope.status = 0;
      if ($location.search().emailConfirmToken) {
        $scope.status = 1;
        var params = {
          emailConfirmToken: $location.search().emailConfirmToken
        };
        Network.post('end/confirmemail', params).then(function(response) {
          if (response) {
            $scope.status = 2;
          }
          else $scope.status = 3;
        });
      }
    }
  }
});
