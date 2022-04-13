"use strict";

var validation = require('../../../../../app_storefront_base/cartridge/client/default/js/components/formValidation.js')

$(document).ready(function() {
  $("form.availability-notification-form").on("submit", function(e) {
    e.preventDefault();

    var form = $(this);
    var url = form.attr('action');
    var values = form.serialize();

    $.ajax({
      url: url,
      type: 'post',
      data: values,
      success: function (data) {
        if (data.success) {
          $("div.availability-notification-form-container").hide();
          $("div.availability-notification-subscribed-message-container").show();
        } else {
          validation(form, data);
        }
      },
      error: function(err) {
        console.log(err)
      }
    })
  })
})
