'use strict';

var Cookie = require('dw/web/Cookie');
var CustomObjectMgr = require('dw/object/CustomObjectMgr');
var Transaction = require('dw/system/Transaction');

var getCookie = require('../scripts/cookies').getCookie;

var server = require('server');

server.post('Submit', function(req, res, next) {
  // save the previous rating before updating it
  var cookie = getCookie(req.form.productId+'-product-rating')
  var previousRating = cookie ? Number(cookie.value) : 0

  var cookie = Cookie(req.form.productId + '-product-rating', req.form.rating)
  response.addHttpCookie(cookie)

  Transaction.wrap(function() {
    var ratingObject = CustomObjectMgr.getCustomObject('ProductRating', req.form.productId)

    if (!ratingObject) {
      ratingObject = CustomObjectMgr.createCustomObject('ProductRating', req.form.productId)
    }

    var ratingSum = ratingObject.custom.ratingsSum ? Number(ratingObject.custom.ratingsSum) : 0
    ratingSum += previousRating ? Number(req.form.rating) - previousRating : Number(req.form.rating)

    var votersCount = ratingObject.custom.votersCount ? Number(ratingObject.custom.votersCount) : 0
    votersCount += previousRating ? 0 : 1

    ratingObject.custom.ratingsSum = ratingSum
    ratingObject.custom.votersCount = votersCount
  })

  res.json({ success: true })

  return next();
})

module.exports = server.exports()