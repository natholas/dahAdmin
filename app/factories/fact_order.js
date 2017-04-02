app.factory("Order", function(Entrepreneurs) {

  var Order = function(data, account) {
    this.id = data.orderId;
    this.amount = data.amount;
    this.donationAmount = data.donationAmount;
    this.entrepreneurId = data.entrepreneurId;
    this.message = data.message;
    this.orderTime = new Date(data.orderTime);
    this.status = data.status;
    this.amount = data.amount;
    this.getEntrepreneur(account);
  };

  Order.prototype.getEntrepreneur = function (account) {
    var order = this;
    Entrepreneurs.returnWhenLoaded().then(function() {
      if (Entrepreneurs.entrepreneurs[order.entrepreneurId]) {
        order.entrepreneur = Entrepreneurs.entrepreneurs[order.entrepreneurId];
        order.linkOrderToEntrepreneur(account);
      } else {
        Entrepreneurs.getEntrepreneur(order.entrepreneurId).then(function(response) {
          if (response) {
            order.entrepreneur = response;
            order.linkOrderToEntrepreneur(account);
          }
        });
      }
    });
  };

  Order.prototype.linkOrderToEntrepreneur = function (account) {
    this.entrepreneur.orders[this.id] = this;
    this.entrepreneur.accountInvestment += this.amount;
    account.investedEntrepreneurs[this.entrepreneur.id] = this.entrepreneur;
  };

  return Order;
});
