'use strict';

module.exports = function (object, apiProduct, type) {
    Object.defineProperty(object, 'promoMsg', {
        enumerable: true,
        value: apiProduct.custom.promoMsg
    });
};
