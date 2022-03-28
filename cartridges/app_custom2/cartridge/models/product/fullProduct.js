'use strict';

var base = module.superModule;
var promoMsgDecorator = require('./decorators/promoMsg');
var tags2Decorator = require('./decorators/tags2');

module.exports = function fullProduct(product, apiProduct, options) {
  var product = base.apply(this, [product, apiProduct, options]) // extend

  promoMsgDecorator(product, apiProduct);
  tags2Decorator(product, apiProduct);

  return product 
}
