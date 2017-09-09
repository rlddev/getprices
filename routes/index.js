var express = require('express');
var fs = require('fs');
var router = express.Router();


var url = "https://api.bitfinex.com/v1/book/xmrbtc";

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Price Difference' });
});

module.exports = router;
