"use strict";

var validation = require('../../../../../app_storefront_base/cartridge/client/default/js/components/formValidation.js')

$(document).ready(function() {
  $("form.availabilityNotificationForm").on("submit", function(e) {
    e.preventDefault();

    var form = $(this);
    var url = form.attr('action');
    var values = form.serialize();

    $.ajax({
      url: url,
      type: 'post',
      data: values,
      success: function (data) {
        validation(form, data);

        if (data.success) {
          // TODO:
          // 1. hide the form
          // 2. display a success message
        }
      },
      error: function(err) {
        console.log(err)
      }
    })
  })
})
