app.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'pages/dash/dash.html'
  })
  .when('/login', {
    templateUrl: 'pages/login/login.html',
    controller: 'loginCtrl'
  })
  .when('/entrepreneurs', {
    templateUrl: 'pages/entrepreneurs/entrepreneurs.html'
  })
  .when('/entrepreneur/:entrepreneurId', {
    template: '<div ng-include="getTemplate()"></div>',
    controller: 'entrepreneurCtrl',
    resolve: {
      entrepreneur: function(ResolveEntrepreneur) {
        return ResolveEntrepreneur().then(function(response) {
          return response;
        });
      }
    }
  })
  .when('/new-entrepreneurs', {
    templateUrl: 'pages/entrepreneur/entrepreneur.html',
    controller: 'entrepreneurCtrl',
    resolve: {
      entrepreneur: function(ResolveNewEntrepreneur) {
        return ResolveNewEntrepreneur();
      }
    }
  })
  .otherwise({
    templateUrl: 'pages/404/404.html'
  });
});
