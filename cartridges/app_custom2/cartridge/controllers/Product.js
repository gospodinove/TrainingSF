'use strict';

var customPreferences = require('dw').system.Site.current.preferences.custom;
var Resource = require('dw/web/Resource');
var getCookie = require('../scripts/cookies').getCookie;
var CustomObjectMgr = require('dw/object/CustomObjectMgr');

var server = require('server');
var page = module.superModule;

server.extend(page);

server.append('Show', function (req, res, next) {
    var customerName = customer.profile ? customer.profile.firstName : "guest"

    var viewData = res.getViewData();

    viewData.isSubscribedForAvailabilityNotification = getCookie(viewData.product.id) !== undefined;
    viewData.customSitePreference = customPreferences.customSitePreference;
    viewData.name = Resource.msgf('training2.template.name', 'training2', null, customerName);

    var productRatingCookie = getCookie(viewData.product.id + '-product-rating')

    var productRatingObject = CustomObjectMgr.getCustomObject('ProductRating', viewData.product.id)

    var ratingsSum = productRatingObject ? productRatingObject.custom.ratingsSum : 0
    var votersCount = productRatingObject ? productRatingObject.custom.votersCount : 0

    viewData.productRating = {
        // prevent division by 0
        averageRating: (ratingsSum / (votersCount ? votersCount : 1)).toFixed(2)
    }
    
    if (productRatingCookie) {
        viewData.productRating['userRating'] = productRatingCookie.value
    }

    res.setViewData(viewData);
    next();
});

module.exports = server.exports();
