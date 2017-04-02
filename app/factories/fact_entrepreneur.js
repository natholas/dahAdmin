app.factory('Entrepreneur', function(Network, Notifications, $location, $timeout) {

  var Entrepreneur = function(data, teamId) {
    this.updateData(data, teamId);
    this.origionalData = data;
  }

  Entrepreneur.prototype.updateData = function (data, teamId) {
    this.id = data.entrepreneurId;
    this.name = data.name;
    this.status = data.status;
    this.description = data.description;
    this.dob = new Date(data.dob);
    this.dob.setTime(this.dob.getTime() + 1000 * 3600 * 12 + this.dob.getTimezoneOffset()*60*1000);
    this.city = data.city;
    this.countryId = data.countryId;
    this.amountNeeded = data.amountNeeded ? data.amountNeeded : 0;
    this.totalInvested = data.totalInvested ? data.totalInvested : 0;
    this.teamId = teamId ? teamId : data.teamId;
    this.createdTime = data.createdTime;
    this.fundedTime = data.fundedTime;
    this.teamName = data.teamName;
    this.countryName = data.countryName;
    this.image = data.image;
    this.orders = {};
    this.accountInvestment = 0;
  };

  Entrepreneur.prototype.getInvestors = function () {
    if (!this.id) return;
    var params = {entrepreneurId: this.id}, entr = this;
    Network.post('end/getinvestors', params).then(function(response) {
      if (response) entr.investors = response.investors;
    });
  };

  Entrepreneur.prototype.reset = function () {
    this.updateData(this.origionalData);
  };

  Entrepreneur.prototype.update = function () {
    if (this.updating) return;
    this.updating = true;

    var add = !this.id;

    var params = {
      entrepreneurId: this.id,
      name: this.name,
      description: this.description,
      dob: this.dob.toJSON(),
      city: this.city,
      countryId: this.countryId,
      amountNeeded: this.amountNeeded*1,
      status: this.status,
      teamId: this.teamId
    };
    var entr = this;
    var url = 'adm/updateentrepreneur';
    if (!this.id) url = 'adm/addentrepreneur';
    Network.post(url, params).then(function(response) {
      entr.updating = false;
      if (response) {
        if (add) entr.id = response.entrepreneurId;
        if (entr.newImage) {
          entr.addImage(entr.newImage.base64).then(function() {
            entr.afterUpdate(add, params);
          });
        } else entr.afterUpdate(add, params);
      }
    });
  };

  Entrepreneur.prototype.afterUpdate = function (add, params) {
    var entr = this;
    Notifications.add(add ? 'Entrepreneur updated' : 'Entrepreneur created', 'good');
    if (add) $timeout(function() {
      $location.path('/entrepreneur/' + entr.id);
    }, 500);
    else for (var i in params) this.origionalData[i] = params[i];
  };

  Entrepreneur.prototype.addImage = function (imageData) {
    var params = {
      entrepreneurId: this.id,
      image: imageData
    };
    var entr = this;
    return Network.post('adm/addimage', params).then(function(response) {
      if (response) {
        entr.origionalData.image = response.imagePath;
        entr.image = response.imagePath;
        entr.newImage = null;
      }
      return response;
    });
  };

  return Entrepreneur;

});
