var axios = require('axios');
var lib = require('./lib');
var gatewayId = process.env.ETHERSHIFT_GATEWAY_ID;

var api = {
  createOrder: function (req, res) {
    console.log(req.query);
    var amount = req.query.amount * Math.pow(10, 8);
    var signature = lib.createSignature(1);

    console.log(signature);

    axios.post('https://gateway.gear.mycelium.com/gateways/' + gatewayId + '/orders', {
        amount: amount,
        keychain_id: 1,
        signature: signature
      })
      .then(function (response) {
        console.log(response);
        return res.send(response.data);
      })
      .catch(function (err) {
        console.log(err);
        return res.send(err);
      });
  }
};

module.exports = api;