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

  var ratingObject = CustomObjectMgr.getCustomObject('ProductRating', req.form.productId)

  var ratingsSum = ratingObject ? Number(ratingObject.custom.ratingsSum) : 0
  ratingsSum += previousRating ? Number(req.form.rating) - previousRating : Number(req.form.rating)

  var votersCount = ratingObject ? Number(ratingObject.custom.votersCount) : 0
  votersCount += previousRating ? 0 : 1

  Transaction.wrap(function() {
    if (!ratingObject) {
      ratingObject = CustomObjectMgr.createCustomObject('ProductRating', req.form.productId)
    }

    ratingObject.custom.ratingsSum = ratingsSum
    ratingObject.custom.votersCount = votersCount
  })

  res.json({ success: true, averageRating: (ratingsSum / (votersCount ? votersCount : 1)).toFixed(2) })

  return next();
})

module.exports = server.exports()