'use strict';
var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
/**
 * Render logic for the component.
 */
module.exports.render = function (context, modelIn) {
  var model = modelIn || new HashMap();
  var content = context.content;
  
  model.imageURL = content.image.getAbsURL();
  model.alt = content.alt ? content.alt : null;
  model.heading = content.heading ? content.heading : null;

  return new Template('experience/components/banner').render(model).text;
};