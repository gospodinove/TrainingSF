'use strict';

var server = require('server');
var Cookie = require('dw/web/Cookie');
var CustomObjectMgr = require('dw/object/CustomObjectMgr');
var Transaction = require('dw/system/Transaction');

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

  Transaction.wrap(function() {
    var obj = CustomObjectMgr.createCustomObject('ProductAvailabilitySubscription', availabilityNotificationForm.email.value + availabilityNotificationForm.productId.value);

    obj.custom.email = availabilityNotificationForm.email.value;
    obj.custom.productId = availabilityNotificationForm.productId.value;
  });

  res.json({ success: true })

  return next();
})

module.exports = server.exports();
