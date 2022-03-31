'use strict';

var server = require('server');
var userLoggedIn = require('*/cartridge/scripts/middleware/userLoggedIn');

server.get('Show', userLoggedIn.validateLoggedIn, function (req, res, next) {
    var URLUtils = require('dw/web/URLUtils');
    var profileForm = server.forms.getForm('profile');
    profileForm.clear();

    if (customer.profile) {
      profileForm.customer.firstname.value = customer.profile.firstName;
      profileForm.customer.lastname.value = customer.profile.lastName;
      profileForm.customer.email.value = customer.profile.email;
      profileForm.training2.interests.value = customer.profile.custom.interests;
      profileForm.training2.favoriteMovie.value = customer.profile.custom.favoriteMovie;
    }

    res.render('form', {
      actionUrl: URLUtils.url('Form-Process'),
      profileForm: profileForm
    });

    next();
});

server.post('Process', userLoggedIn.validateLoggedIn, function (req, res, next) {
  var Transaction = require('dw/system/Transaction');
  var profileForm = server.forms.getForm('profile');

  var result = {
    firstName: profileForm.customer.firstname.value,
    lastName: profileForm.customer.lastname.value,
    email: profileForm.customer.email.value,
    interests: profileForm.training2.interests.value,
    favoriteMovie: profileForm.training2.favoriteMovie.value
  }

  res.setViewData(result);

  this.on('route:BeforeComplete', function() {
    Transaction.wrap(function() {
      if (!customer.profile) {
        return
      }

      var formInfo = res.getViewData();

      customer.profile.firstName = formInfo.firstName;
      customer.profile.lastName = formInfo.lastName;
      customer.profile.email = formInfo.email;

      customer.profile.custom.interests = formInfo.interests;
      customer.profile.custom.favoriteMovie = formInfo.favoriteMovie;
    })
  })

  res.json({success: true, message: "Updated customer profile data"});

  return next();
});

module.exports = server.exports();
