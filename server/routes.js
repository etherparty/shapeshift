var express = require('express');
var router = express.Router();
var apiRouter = express.Router();
var api = require('./api');

router.get('/', function (req, res, next) {
  res.render('index', {
    path: req.path
  });
});

apiRouter.get('/rate', api.getRate);

apiRouter.get('/createOrder', api.createOrder);
apiRouter.post('/createOrder', api.createOrder);

apiRouter.get('/deposit', api.deposit);
apiRouter.post('/deposit', api.deposit);

module.exports = {
  router: router,
  apiRouter: apiRouter
};
