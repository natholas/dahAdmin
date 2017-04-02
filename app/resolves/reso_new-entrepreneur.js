app.factory('ResolveNewEntrepreneur', function(Entrepreneur, $route, Account) {
  return function() {
    var entrepreneur = new Entrepreneur({}, Account.teamId);
    return entrepreneur;
  }
});
