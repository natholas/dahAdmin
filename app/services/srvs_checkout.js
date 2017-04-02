app.service('Checkout', function(Network, Account, Storage, Notifications) {

  this.checkingOut = false;
  var check = this;

  this.init = function (order) {
    if (this.checkingOut || Account.signingUp || Account.loggingIn) return;
    this.checkingOut = true;
    if (Account.loginToken) this.doOrder(order);
    else {
      console.log("signing up");
      Account.signup(
        order.user.emailAddress.toLowerCase(),
        order.user.password,
        order.user.nickname,
        'PUBLIC'
      ).then(function(response) {
        if (response) {

          console.log("logging in");
          Account.login(
            order.user.emailAddress.toLowerCase(),
            order.user.password
          ).then(function(response) {

            console.log(response);
            if (response) check.doOrder(order);
          });
        }
      });
    }
  };

  this.doOrder = function (order) {
    var params = {
      entrepreneurId: order.entrepreneur.id,
      amount: order.amount,
      donationAmount: order.donationAmount,
      message: order.message ? order.message : ''
    };
    Network.post('end/ordercomplete', params).then(function(response) {
      if (response) {
        Storage.set('orderData', order, true);
        window.location = response.RedirectUrl;
      }
      else Notifications.add('Your order could not be processed. Please try again later.', 'bad');
    });
  }

});
