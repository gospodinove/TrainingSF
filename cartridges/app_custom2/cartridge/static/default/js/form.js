"use strict";

$(document).ready(function() {
  $("form.training2").on("submit", function(e) {
    e.preventDefault();

    var url = $(this).attr('action');
    var values = $(this).serialize();

    $.ajax({
      url: url,
      type: 'post',
      data: values,
      success: function (data) {
        console.log(data)
      },
      error: function(err) {
        console.log(err)
      }
    })
  })
})