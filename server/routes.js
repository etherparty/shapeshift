var express = require('express');
var router = express.Router();
var api = require('./api');

router.get('/', function (req, res, next) {
  res.render('index', {
    path: req.path
  });
});

router.get('/createOrder', api.createOrder);

module.exports = router;