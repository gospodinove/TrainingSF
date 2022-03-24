'use strict';

var customPreferences = require('dw').system.Site.current.preferences.custom;
var server = require('server');
var page = module.superModule;

server.extend(page);

server.append('Show', function (req, res, next) {
    var viewData = res.getViewData();

    viewData.customSitePreference = customPreferences.customSitePreference;

    res.setViewData(viewData);
    next();
});

module.exports = server.exports();
