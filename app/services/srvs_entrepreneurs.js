app.service('Entrepreneurs', function(Network, Entrepreneur, $interval, $q, Bootloader) {

  var entr = this;
  this.entrepreneurs = {};
  this.getting = {};

  this.init = function() {
    Network.post('end/getentrepreneurs').then(function(response) {
      if (response) {
        entr.processEntrepreneurData(response.entrepreneurs);
      }
    });
  };

  this.processEntrepreneurData = function (entrepreneurs) {
    for (var i in entrepreneurs) {
      if (!this.entrepreneurs[entrepreneurs[i].entrepreneurId])
        this.entrepreneurs[entrepreneurs[i].entrepreneurId] = new Entrepreneur(entrepreneurs[i]);
      else this.entrepreneurs[entrepreneurs[i].entrepreneurId].updateData(entrepreneurs[i]);
    }
    this.dataLoaded = true;
  };

  this.returnWhenLoaded = function (id) {
    var deferred = $q.defer();
    var interval = $interval(function() {
      if ((id && entr.entrepreneurs[id]) || (!id && entr.dataLoaded)) {
        $interval.cancel(interval);
        deferred.resolve();
      }
    }, 20);
    return deferred.promise;
  };

  this.getEntrepreneur = function (entrepreneurId) {
    if (this.getting[entrepreneurId]) {
      return this.returnWhenLoaded(entrepreneurId).then(function() {
        return entr.entrepreneurs[entrepreneurId];
      });
    } else {
      this.getting[entrepreneurId] = true;
      var params = {entrepreneurId: entrepreneurId};
      return Network.post('end/getentrepreneur', params).then(function(response) {
        if (response) {
          entr.entrepreneurs[entrepreneurId] = new Entrepreneur(response);
          return entr.entrepreneurs[entrepreneurId];
        }
        else return false;
      });
    }
  };

  Bootloader.returnWhenLoaded().then(function() {
    entr.init();
  });

});
