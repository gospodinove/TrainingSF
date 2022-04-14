"use strict";

$(document).ready(function () {
  $('input[name="rating"]').on('change', function () {
    var elementId = $(this).attr('id')

    $('form#product-rating-form label').each(function(_, el) {
      $(el).removeClass('selected')
    })

    $('form#product-rating-form label[for='+elementId+']').addClass('selected')

    $('form#product-rating-form').submit();
  })

  $('form#product-rating-form').on('submit', function(e) {
    e.preventDefault();

    var url = $(this).attr('action')
    var values = $(this).serialize()

    $.ajax({
      url: url,
      type: 'post',
      data: values,
      success: function (data) {
        console.log('rating success data:', data)
      },
      error: function(err) {
        console.log(err)
      }
    })
  })
})