app.directive('heroBanner', function() {
  return {
    limit: 'E',
    transclude: true,
    templateUrl: 'directives/hero-banner/hero-banner.html',
    scope: {url: '='}
  }
});
