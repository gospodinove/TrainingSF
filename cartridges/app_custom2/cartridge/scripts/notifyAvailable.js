var ProductMgr = require('dw/catalog/ProductMgr');
var CustomObjectMgr = require('dw/object/CustomObjectMgr');
var Transaction = require('dw/system/Transaction');
var Mail = require('dw/net/Mail');
var ArrayList = require('dw/util/ArrayList');

var deleteCookie = require('./cookies').deleteCookie;

function execute(args) {
  var products = ProductMgr.queryAllSiteProducts();

  while(products.hasNext()) {
    var product = products.next()

    if (product.getAvailabilityModel().isInStock()) {
      var subscribersObjects = CustomObjectMgr.queryCustomObjects('ProductAvailabilitySubscription', 'custom.productId = {0}', null, product.ID);

      if (subscribersObjects.count === 0) {
        continue
      }

      var mail = new Mail()
      
      mail.setFrom('emo@training2.com')
      mail.setSubject('New available products')
      mail.setContent(product.name + ' is now available!!')

      var emailsTo = [];

      Transaction.wrap(function () {
        while (subscribersObjects.hasNext()) {
          var subscriber = subscribersObjects.next();

          emailsTo.push(subscriber.custom.email);
          
          CustomObjectMgr.remove(subscriber);
        }
      })

      mail.setTo(ArrayList(emailsTo))
      mail.send()

      subscribersObjects.close();
    }
  }

  products.close();

  return PIPELET_NEXT;
}

module.exports = {
  execute: execute
}