/**
 * @description
 * This service handles notifications. Any service or controller can use this service to notify the customer
 * This service does not have any dependencies so it can by used by any service or controller
**/

app.service("Notifications", function(Notice) {

  this.data = {"notifications":[]};
  var noti = this, count = 1;

  this.data.errorTexts = {
    "DATA_DOESNT_MATCH_AN_EXISTING_ACCOUNT": "The data you entered doesn't match any account. Please double check your password and try again"
  };

  /**
  * @description
  * Adds a new notification. This notification will be visible straight away
  * This notification can be removed with the remove function. It will automatically be removed after the duration
  * @param {string} message This is the key that will be looked up in the translation table
  * @param {string} type The type is used as a class so that it can be styled with css
  * @param {integer} urgency On a scale of 1-10 how urgent The notification is.
  * @param {integer} duration The amount of seconds the notification will be shown.
  **/
  this.add = function (message, type, urgency, duration) {
    console.log(message);
    if (this.data.errorTexts[message]) message = this.data.errorTexts[message];
    noti.data.notifications.push(new Notice(message, type, urgency, duration, noti, count));
    count += 1;
  };

  /**
  * @description
  * Removes a notification. This is called from within the notice function but can also be triggered manually
  * @param {integer} id The ID of the notification
  **/
  this.remove = function (id) {
    for (var i in noti.data.notifications) {
      if (id == noti.data.notifications[i].id) {
        noti.data.notifications.splice(i, 1);
        return;
      }
    }
  };

});
