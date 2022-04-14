'use strict';

var Cookie = require('dw/web/Cookie');
var server = require('server');

server.post('Submit', function(req, res, next) {
  var cookie = Cookie(req.form.productId + '-product-rating', req.form.rating)
  response.addHttpCookie(cookie)

  res.json({ success: true })

  return next();
})

module.exports = server.exports()