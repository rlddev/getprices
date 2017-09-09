var request = require('request');
var fs = require("fs")

var xmrbtc_bitfinex_url = "https://api.bitfinex.com/v1/book/xmrbtc";
var xmrbtc_poloniex_url = "https://poloniex.com/public?command=returnOrderBook&currencyPair=BTC_XMR";

setInterval(function(){get(xmrbtc_bitfinex_url, "xmrbtcbitfinex.json")}, 4000);
setInterval(function(){get(xmrbtc_bitfinex_url, "xmrbtcpoloniex.json")}, 4000);

function get(url, filename){
  request({
      url: url,
      json: true
  }, function (error, response, body) {

      if (!error && response.statusCode === 200) {

          prices = body // Print the json response


          fs.writeFile(filename, JSON.stringify(prices));
          //console.log("updated " + filename)
      }
  });
}
