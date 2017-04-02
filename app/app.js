angular.module('templates', []);
var app = angular.module('app', ['ngRoute', 'templates'])

.config(function($routeProvider, $locationProvider, $httpProvider) {
  $locationProvider.html5Mode(true);

  var originalWhen = $routeProvider.when;
  $routeProvider.when = function(path, route) {
    route.resolve || (route.resolve = {});
    angular.extend(route.resolve, {
      visitorToken: function(Bootloader) {
        return Bootloader.init().then(function(response) {
          return response;
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
  if ($location.$$host == 'dev.dah.local')
    $rootScope.backend_endpoint = "http://localhost:3000/";

});
