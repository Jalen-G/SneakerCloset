import * as functions from 'firebase-functions';

export const helloWorld = functions.https.onRequest(async (request, response) => {
  const stockxAPI = require('stockx-api');
  const stockX = new stockxAPI();
   
  stockX.fetchProductDetails('https://stockx.com/adidas-yeezy-boost-700-magnet')
  .then(product => response.send((parseResponse(product))));
});

function parseResponse(product) {
  var shoeName = product.name;
  shoeName = shoeName.replace(/\s+/g, '-');
  return {
    "img-url": "https://stockx-360.imgix.net/" + shoeName + "/Images/" + shoeName + "/Lv2/img01.jpg?auto=format,compress&q=90&updated_at=1568299976&w=1000",
    "price": product.variants[14].market.averageDeadstockPrice
  }
}