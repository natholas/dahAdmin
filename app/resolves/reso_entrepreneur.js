app.factory('ResolveEntrepreneur', function(Entrepreneurs, $route) {
  return function() {
    return Entrepreneurs.returnWhenLoaded().then(function() {
      return Entrepreneurs.entrepreneurs[$route.current.params.entrepreneurId];
    });
  }
});
