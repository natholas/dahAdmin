app.factory('ResolveEntrepreneur', function(Entrepreneurs, $route) {
  return function() {
    return Entrepreneurs.returnWhenLoaded().then(function() {
      if (Entrepreneurs.entrepreneurs[$route.current.params.entrepreneurId]) {
        return Entrepreneurs.entrepreneurs[$route.current.params.entrepreneurId];
      }
      return Entrepreneurs.getEntrepreneur($route.current.params.entrepreneurId*1).then(function(response) {
        if (response) return response;
        return false;
      });
    });
  }
});
