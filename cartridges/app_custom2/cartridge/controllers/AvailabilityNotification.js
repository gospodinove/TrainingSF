'use strict';

var server = require('server');
var Cookie = require('dw/web/Cookie');

server.post('Submit', function(req, res, next) {
  var formErrors = require('*/cartridge/scripts/formErrors');

  var availabilityNotificationForm = server.forms.getForm('availabilityNotification');

  var errors = formErrors.getFormErrors(availabilityNotificationForm)

  if (!availabilityNotificationForm.valid || (errors && Object.keys(errors).length > 0)) {
    res.json({ success: false, fields: errors });
    return next();
  }

  var cookie = new Cookie(availabilityNotificationForm.productId.value, '');
  response.addHttpCookie(cookie);
  
  // TODO: create the custom object

  res.json({ success: true })

  return next();
})

module.exports = server.exports();
