"use strict";

$(document).ready(function () {
  $('input[name="rating"]').on('change', function () {
    var elementId = $(this).attr('id')

    $('form#product-rating-form label').each(function(_, el) {
      $(el).removeClass('selected')
    })

    $('form#product-rating-form label[for='+elementId+']').addClass('selected')

    var form = $('form#product-rating-form').submit();

    var url = form.attr('action')
    var values = form.serialize()

    $.ajax({
      url: url,
      type: 'post',
      data: values,
      success: function (data) {
        $("span#average-rating").html(data.averageRating)
      },
      error: function(err) {
        console.log(err)
      }
    })
  })
})