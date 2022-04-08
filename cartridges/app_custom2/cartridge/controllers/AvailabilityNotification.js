'use strict';

var server = require('server');

server.post('Submit', function(req, res, next) {
  var formErrors = require('*/cartridge/scripts/formErrors');

  var availabilityNotificationForm = server.forms.getForm('availabilityNotification');

  var errors = formErrors.getFormErrors(availabilityNotificationForm)

  if (!availabilityNotificationForm.valid || (errors && Object.keys(errors).length > 0)) {
    res.json({ success: false, fields: errors });
    return next();
  }

  // TODO: 
  // 1. create a cookie to prevent the form from showing next time
  // 2. create the custom object

  res.json({ success: true })

  return next();
})

module.exports = server.exports();
