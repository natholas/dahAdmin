app.service("Account", function(Network, Storage, Order, Entrepreneurs, $timeout) {

  var acc = this;
  this.loginToken = null;
  this.role = null;
  this.userDetails = null;
  this.orders = {};
  this.investedEntrepreneurs = {};

  this.loggingIn = false;
  this.signingUp = false;
  this.gettingOrders = false;

  this.init = function () {
    if (data = Storage.get('loginData')) {
      acc.loginToken = Network.loginToken = data.loginToken;
      acc.role = data.role;
      acc.userDetails = data.userDetails;
      acc.getOrders();
    }
  }

  this.login = function (emailAddress, password) {
    if (this.loggingIn) return;
    this.loggingIn = true;
    var params = {
      emailAddress: emailAddress,
      password: password
    }
    return Network.post('end/login', params).then(function(response) {
      acc.loggingIn = false;
      if (response) {
        acc.loginToken = Network.loginToken = response.loginToken;
        acc.role = response.role;
        acc.userDetails = response.userDetails;
        Storage.set('loginData', {
          loginToken: acc.loginToken,
          role: acc.role,
          userDetails: acc.userDetails
        }, true);
        acc.getOrders();
      }
      return response;
    });
  };

  this.logout = function () {
    this.loginToken = null;
    this.role = null;
    this.userDetails = null;
    Storage.remove('loginData');
  };

  this.signup = function (emailAddress, password, nickname, publicStatus) {
    if (this.signingUp) return;
    this.signingUp = true;
    var params = {
      emailAddress: emailAddress,
      password: password,
      nickname: nickname,
      publicStatus: publicStatus
    }

    return Network.post('end/signup', params).then(function(response) {
      acc.signingUp = false;
      return response;
    });

  };

  this.getOrders = function () {
    if (this.gettingOrders || !this.loginToken) return;
    this.gettingOrders = true;

    Network.post('end/getorders').then(function(response) {
      this.gettingOrders = false;
      if (response) {
        acc.processOrders(response.orders, acc.orders);
        // Entrepreneurs.returnWhenLoaded().then(function() {
        //   $timeout(function() {
        //     acc.linkOrdersToEntrepreneurs(acc.orders, acc.investedEntrepreneurs);
        //   }, 20);
        // });
      }
    });
  };

  this.processOrders = function (newOrders, orders) {
    for (var i in newOrders)
      orders[newOrders[i].orderId] = new Order(newOrders[i], this);
  };
  //
  // this.linkOrdersToEntrepreneurs = function (orders, entrepreneurs) {
  //   for (var i in orders) {
  //     entrepreneurs[orders[i].entrepreneur.id] = orders[i].entrepreneur;
  //   }
  // };

  this.init();

});
