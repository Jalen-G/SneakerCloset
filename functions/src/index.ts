import * as functions from 'firebase-functions';

export const helloWorld = functions.https.onRequest(async (request, response) => {
  const stockxAPI = require('stockx-api');
  const stockX = new stockxAPI();
  var info;
   
  await stockX.searchProducts(request.url.substring(1), {
    limit: 1
  }).then(products => info = parseResponse(products))
  .then(console.log(info));
});

async function parseResponse(product) {
  const request = require('request-promise');
  const requestOptions = {
    uri: `https://stockx.com/api/products/${product[0].urlKey}?includes=market`,
    headers: {
        'sec-fetch-mode': 'cors',
        'accept-language': 'en-US,en;q=0.9',
        'authorization': '',
        'x-requested-with': 'XMLHttpRequest',
        'appos': 'web',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36',
        'accept': '*/*',
        'authority': 'stockx.com',
        'sec-fetch-site': 'same-origin',
        'appversion': '0.1'
    },
    simple: false,
    resolveWithFullResponse: true
};

const res = await request(requestOptions);

const body = JSON.parse(res.body); 
console.log(body.Product.title);
return {

};
}