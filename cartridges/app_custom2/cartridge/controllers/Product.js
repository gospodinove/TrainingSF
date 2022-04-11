'use strict';

var customPreferences = require('dw').system.Site.current.preferences.custom;
var Resource = require('dw/web/Resource');
var URLUtils = require('dw/web/URLUtils');
var getCookie = require('../scripts/cookies').getCookie;

var server = require('server');
var page = module.superModule;

server.extend(page);

server.append('Show', function (req, res, next) {
    var availabilityNotificationForm = server.forms.getForm('availabilityNotification');
    availabilityNotificationForm.clear();

    var customerName = customer.profile ? customer.profile.firstName : "guest"

    var viewData = res.getViewData();

    availabilityNotificationForm.productId.value = viewData.product.id;

    viewData.isSubscribedForAvailabilityNotification = getCookie(viewData.product.id) !== undefined;
    viewData.customSitePreference = customPreferences.customSitePreference;
    viewData.name = Resource.msgf('training2.template.name', 'training2', null, customerName);

    viewData.availabilityNotificationForm = availabilityNotificationForm;
    viewData.availabilityNotificationFormActionUrl = URLUtils.url('AvailabilityNotification-Submit');

    res.setViewData(viewData);
    next();
});

module.exports = server.exports();
