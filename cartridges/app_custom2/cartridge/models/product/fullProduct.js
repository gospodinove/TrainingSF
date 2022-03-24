'use strict';

var base = module.superModule;
var promoMsgDecorator = require('./decorators/promoMsg');

module.exports = function fullProduct(product, apiProduct, options) {
  var product = base.apply(this, [product, apiProduct, options]) // extend

  promoMsgDecorator(product, apiProduct);

  return product 
}
