var express = require('express');
var router = express.Router();
var fs = require("fs")

/* GET users listing. */
router.get('/bitfinex/xmrbtc', function(req, res, next) {
  pr = JSON.parse(fs.readFileSync("xmrbtcbitfinex.json", 'utf-8'))
  res.json(pr);
});

router.get('/poloniex/xmrbtc', function(req, res, next) {
  pr = JSON.parse(fs.readFileSync("xmrbtcpoloniex.json", 'utf-8'))
  res.json(pr);
});

module.exports = router;
