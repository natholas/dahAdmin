app.service("Account", function(Network, Storage, Entrepreneurs, $location) {

  var acc = this;
  this.loginToken = null;
  this.role = null;
  this.userDetails = null;


  // TODO: Need to get the teamId from the server somehow
  this.teamId = 1;


  this.orders = {};

  this.loggingIn = false;

  this.init = function () {
    if (data = Storage.get('loginData')) {
      acc.loginToken = Network.loginToken = data.loginToken;
      acc.role = data.role;
      acc.userDetails = data.userDetails;
      if (acc.role == 'ADMIN' || acc.role == 'SUPER') {
        return acc;
      }
      return false;
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
        $location.path('/');
      }
      return response;
    });
  };

  this.logout = function () {
    this.loginToken = null;
    this.role = null;
    this.userDetails = null;
    Storage.remove('loginData');
    $location.path('/login');
  };

  // this.init();

});
