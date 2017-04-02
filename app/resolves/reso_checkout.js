app.factory('ResolveCheckout', function(Entrepreneurs, $route) {
  return function() {
    return Entrepreneurs.returnWhenLoaded().then(function() {
      var entrepreneur = Entrepreneurs.entrepreneurs[$route.current.params.entrepreneurId];
      var amount = $route.current.params.investmentAmount*1;
      if (entrepreneur && amount) {
        if (entrepreneur.stillNeeded < amount) {
          amount = entrepreneur.stillNeeded*1;
        }
        return {
          entrepreneur: entrepreneur,
          amount: amount,
          donationAmount: 2,
          user: {}
        }
      }
      return null;
    });
  }
});
