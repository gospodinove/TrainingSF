var CustomObjectMgr = require('dw/object/CustomObjectMgr');
var FileWriter = require('dw/io/FileWriter');
var File = require('dw/io/File');
var Transaction = require('dw/system/Transaction');
var logger = require('dw/system/Logger');

function execute(args) {
  var destinationPath = File.IMPEX + File.SEPARATOR + 'src' + File.SEPARATOR;

  var destinationFile = new File(destinationPath + 'ratings.xml');
  var fileWriter = new FileWriter(destinationFile, 'UTF-8');

  try {
    fileWriter.writeLine('<?xml version="1.0" encoding="UTF-8"?>');
    fileWriter.writeLine('<catalog xmlns="http://www.demandware.com/xml/impex/catalog/2006-10-31" catalog-id="master-catalog-training-2">');

    var ratingObjs = CustomObjectMgr.getAllCustomObjects('ProductRating');

    while (ratingObjs.hasNext()) {
      var ratingObj = ratingObjs.next()

      fileWriter.writeLine('<product product-id="' + ratingObj.custom.productId + '">')
      fileWriter.writeLine('<custom-attributes>')
      fileWriter.writeLine('<custom-attribute attribute-id="ratingsSum">'+ ratingObj.custom.ratingsSum + '</custom-attribute>')
      fileWriter.writeLine('<custom-attribute attribute-id="votersCount">'+ ratingObj.custom.votersCount + '</custom-attribute>')
      fileWriter.writeLine('</custom-attributes>')
      fileWriter.writeLine('</product>')

      Transaction.wrap(function() {
        CustomObjectMgr.remove(ratingObj)
      })
    }

    fileWriter.writeLine('</catalog>')
  } catch (err) {
    logger.error('[ERROR][Import Ratings Job] - ' + err);
  } finally {
    fileWriter.flush();
    fileWriter.close();
  }

  return PIPELET_NEXT;
}

module.exports = {
  execute: execute
}