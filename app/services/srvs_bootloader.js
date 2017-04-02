app.service("Bootloader", function(Network, $q, Storage, $interval, Notifications) {

  var boot = this;
  this.visitorToken;

  this.init = function () {
    var deferred = $q.defer();
    if (this.visitorToken) deferred.resolve(this.visitorToken);
    else if (token = Storage.get('visitorToken')) {
      this.visitorToken = Network.visitorToken = token;
      boot.dataLoaded = true;
      deferred.resolve(this.visitorToken);
    }
    else Network.post('end/bootloader').then(function(response) {
      if (response) {
        this.visitorToken = Network.visitorToken = response.visitorToken;
        Storage.set('visitorToken', this.visitorToken, true);
        boot.dataLoaded = true;
        deferred.resolve(this.visitorToken);
      }
      else {
        Notifications.add('There was a technical error. Please try again later', 'bad', 10);
      }
    });
    return deferred.promise;
  };

  this.returnWhenLoaded = function () {
    var deferred = $q.defer();
    var interval = $interval(function() {
      if (boot.dataLoaded) {
        $interval.cancel(interval);
        deferred.resolve();
      }
    }, 20);
    return deferred.promise;
  };


});
