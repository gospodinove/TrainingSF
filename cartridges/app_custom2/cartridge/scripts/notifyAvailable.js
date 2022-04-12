var ProductMgr = require('dw/catalog/ProductMgr');
var CustomObjectMgr = require('dw/object/CustomObjectMgr');
var Transaction = require('dw/system/Transaction');
var Mail = require('dw/net/Mail');

var deleteCookie = require('./cookies').deleteCookie;

function execute(args) {
  var products = ProductMgr.queryAllSiteProducts();

  while(products.hasNext()) {
    var product = products.next()

    if (product.getAvailabilityModel().isInStock()) {
      var subscribersObjects = CustomObjectMgr.queryCustomObjects('ProductAvailabilitySubscription', 'custom.productId = {0}', null, product.ID);

      // send emails only for the products that have been subscribed to
      var shouldSendEmails = subscribersObjects.hasNext()

      var mail = new Mail()
      
      if (shouldSendEmails) {
        mail.setFrom('emo@training2.com')
        mail.setSubject('New available products')
        mail.setContent(product.name + ' is now available!!')
      }

      var emailsTo = mail.getTo();

      Transaction.wrap(function () {
        while (subscribersObjects.hasNext()) {
          var subscriber = subscribersObjects.next();

          emailsTo.push(subscriber.custom.email);
          
          CustomObjectMgr.remove(subscriber);
        }
      })

      deleteCookie(product.ID);

      if (shouldSendEmails) {
        mail.setTo(emailsTo)
        mail.send()
      }

      subscribersObjects.close();
    }
  }

  products.close();

  return PIPELET_NEXT;
}

module.exports = {
  execute: execute
}