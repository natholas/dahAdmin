app.factory("Notice", function($interval, $rootScope) {
  /**
  * @description
  * Adds a new notification. This notification will be visible straight away
  * This notification can be removed with the remove function. It will automatically be removed after the duration
  * @param {string} message This is the key that will be looked up in the translation table
  * @param {string} type The type is used as a class so that it can be styled with css
  * @param {integer} urgency On a scale of 1-10 how urgent The notification is.
  * @param {integer} duration The amount of seconds the notification will be shown.
  * @param {function} notifications The notifications service
  * @returns {function} The notice function
  **/
  var Notice = function(message, type, urgency, duration, notifications, id) {

    var notice = this;
    this.id = id;
    this.type = type;
    this.urgency = urgency;
    notice.message = message;
    if (!duration) duration = 5;

    // Checking the urgency.
    // If the urgency is less than 8, we do nothing.
    // Otherwise we set majorError to true which will shut the whole front end down and display an error message.
    if (!urgency || urgency < 8) {
      $interval(function() {
        notifications.remove(notice.id);
      }, duration * 1000, 1);
    } else $rootScope.majorError = true;

  };

  return Notice;
});
