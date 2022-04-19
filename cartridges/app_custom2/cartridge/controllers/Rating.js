'use strict';

var Cookie = require('dw/web/Cookie');
var CustomObjectMgr = require('dw/object/CustomObjectMgr');
var Transaction = require('dw/system/Transaction');
var ProductMgr = require('dw/catalog/ProductMgr');

var getCookie = require('../scripts/cookies').getCookie;

var server = require('server');

server.post('Submit', function(req, res, next) {
  // save the previous rating before updating it
  var cookie = getCookie(req.form.productId+'-product-rating')
  var previousRating = cookie ? Number(cookie.value) : 0

  var cookie = Cookie(req.form.productId + '-product-rating', req.form.rating)
  response.addHttpCookie(cookie)

  var ratingObject = CustomObjectMgr.getCustomObject('ProductRating', req.form.productId)  

  var ratingsSum = 0
  var votersCount = 0

  if (ratingObject) {
    ratingsSum = Number(ratingObject.custom.ratingsSum)
    votersCount = Number(ratingObject.custom.votersCount)
  } else {
    var product = ProductMgr.getProduct(req.form.productId)

    if (product) {
      var productCustom = product.getCustom()
      ratingsSum = productCustom.ratingsSum ? productCustom.ratingsSum : 0
      votersCount = productCustom.votersCount ? productCustom.votersCount : 0
    }
  }
  
  ratingsSum += previousRating ? Number(req.form.rating) - previousRating : Number(req.form.rating)
  votersCount += previousRating ? 0 : 1

  Transaction.wrap(function() {
    if (!ratingObject) {
      ratingObject = CustomObjectMgr.createCustomObject('ProductRating', req.form.productId)
    }

    ratingObject.custom.ratingsSum = ratingsSum
    ratingObject.custom.votersCount = votersCount
    ratingObject.custom.productId = req.form.productId
  })

  res.json({ success: true, averageRating: (ratingsSum / (votersCount ? votersCount : 1)).toFixed(2) })

  return next();
})

module.exports = server.exports()