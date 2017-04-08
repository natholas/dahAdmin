angular.module('templates', []);
var app = angular.module('app', ['ngRoute', 'templates', 'ngImgCrop'])

.config(function($routeProvider, $locationProvider, $httpProvider) {
  $locationProvider.html5Mode(true);

  var originalWhen = $routeProvider.when;
  $routeProvider.when = function(path, route) {
    route.resolve || (route.resolve = {});
    angular.extend(route.resolve, {
      visitorToken: function(Bootloader, Account, $location) {
        return Bootloader.init().then(function(response) {
          Account.init();
          if (['ADMIN', 'SUPER'].indexOf(Account.role) > -1) {
            if ($location.path() == '/login') {
              $location.path('/');
            } else return response;
          } else if ($location.path() != '/login') {
            $location.path('/login');
          }
        });
      }
    });
    return originalWhen.call($routeProvider, path, route);
  };
})

.run(function($rootScope, $templateCache, Storage, $location) {

  $rootScope.$on('$viewContentLoaded', function() {
    var old_version = Storage.get("version");
    if (!old_version) Storage.set("version", @version@);
    else if (old_version != @version@) {
      $templateCache.removeAll();
      Storage.clear();
      window.location.reload(true);
    }
    $rootScope.loaded = true;
  });

  $rootScope.backend_endpoint = "https://dignity-hope.org/";
  if ($location.$$host == 'dev.dahadmin.local')
    $rootScope.backend_endpoint = "http://localhost:3000/";

});
