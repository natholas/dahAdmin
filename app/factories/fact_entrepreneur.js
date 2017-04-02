app.factory('Entrepreneur', function(Network) {

  var Entrepreneur = function(data) {
    this.updateData(data);
  }

  Entrepreneur.prototype.updateData = function (data) {
    this.id = data.entrepreneurId;
    this.name = data.name;
    this.status = data.status;
    this.description = data.description;
    this.dob = new Date(data.dob);
    this.city = data.city;
    this.countryId = data.countryId;
    this.amountNeeded = data.amountNeeded.toFixed(2);
    this.totalInvested = data.totalInvested ? data.totalInvested.toFixed(2) : 0;
    this.stillNeeded = (data.amountNeeded - this.totalInvested).toFixed(2);
    this.teamId = data.teamId;
    this.createdTime = data.createdTime;
    this.fundedTime = data.fundedTime;
    this.teamName = data.teamName;
    this.countryName = data.countryName;
    this.images = data.images.split('|');
    this.orders = {};
    this.accountInvestment = 0;
  };

  Entrepreneur.prototype.getInvestors = function () {
    var params = {entrepreneurId: this.id}, entr = this;
    Network.post('end/getinvestors', params).then(function(response) {
      if (response) entr.investors = response.investors;
    });
  };

  return Entrepreneur;

});
