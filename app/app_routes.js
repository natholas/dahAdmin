app.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'pages/home/home.html'
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
  .when('/checkout/:entrepreneurId/:investmentAmount', {
    template: '<div ng-include="getTemplate()"></div>',
    controller: 'checkoutCtrl',
    resolve: {
      order: function(ResolveCheckout) {
        return ResolveCheckout().then(function(response) {
          return response;
        });
      }
    }
  })
  .when('/confirmation', {
    templateUrl: 'pages/confirmation/confirmation.html'
  })
  .when('/paymentfailed', {
    templateUrl: 'pages/payment-failed/payment-failed.html'
  })
  .when('/confirmemail', {
    templateUrl: 'pages/confirm-email/confirm-email.html'
  })
  .when('/account', {
    template: '<div ng-include="getTemplate()"></div>',
    controller: 'accountCtrl'
  })

  .otherwise({
    templateUrl: 'pages/404/404.html'
  });
});
