var express = require('express');
var router = express.Router();
var api = require('./api');

router.get('/', function (req, res, next) {
  res.render('index', {
    path: req.path
  });
});

router.get('/createOrder', api.createOrder);
router.post('/createOrder', api.createOrder);

router.get('/deposit', api.deposit);
router.post('/deposit', api.deposit);

module.exports = router;