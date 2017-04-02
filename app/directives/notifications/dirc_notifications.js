app.directive('notifications', function() {
  return {
    limit: 'E',
    templateUrl: 'directives/notifications/notifications.html',
    controller: function($scope, Notifications) {
      $scope.Notifications = Notifications;
    }
  }
});
