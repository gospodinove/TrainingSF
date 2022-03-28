'use strict';

module.exports = function (object, apiProduct, type) {
    Object.defineProperty(object, 'tags2', {
        enumerable: true,
        value: apiProduct.custom.tags2
    });
};