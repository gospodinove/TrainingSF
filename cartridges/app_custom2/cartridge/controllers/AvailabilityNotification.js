'use strict';

var server = require('server');
var Cookie = require('dw/web/Cookie');
var CustomObjectMgr = require('dw/object/CustomObjectMgr');
var Transaction = require('dw/system/Transaction');

server.post('Submit', function(req, res, next) {
  var cookie = new Cookie(req.form.productId, '');
  response.addHttpCookie(cookie);

  Transaction.wrap(function() {
    var obj = CustomObjectMgr.createCustomObject('ProductAvailabilitySubscription', req.form.email + req.form.productId);

    obj.custom.email = req.form.email;
    obj.custom.productId = req.form.productId;
  });

  res.json({ success: true })

  return next();
})

module.exports = server.exports();
