"use strict";

var validation = require('../../../../../app_storefront_base/cartridge/client/default/js/components/formValidation.js')

$(document).ready(function() {
  $("form.training2").on("submit", function(e) {
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
      },
      error: function(err) {
        console.log(err)
      }
    })
  })
})
