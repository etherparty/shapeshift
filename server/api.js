var axios = require('axios');
var lib = require('./lib');

var api = {
  createOrder: function (req, res) {
    var withdrawalAddress = req.query.withdrawalAddress;

    if (!withdrawalAddress) return res.json({
      error: 'No withdrawalAddress specified'
    });

    lib.createDepositAddress(withdrawalAddress)
      .then(function (response) {
        if (response.data && response.data.address) {
          return res.json(response.data);
        } else {
          throw Error('Blockchain did not return address instead got ' + JSON.stringify(response.data));
        }
      })
      .catch(function (err) {
        console.error('createDepositAddress error', err);

        return res.json({
          error: 'Could not create deposit address'
        });
      });
  },
  deposit: function (req, res) {
    var amount = req.query.value;
    var address = req.query.input_address;
    var hash = req.query.transaction_hash;
    var confirmations = req.query.confirmations;
    var confirmed = (confirmations > 0) ? true : false;
    var secret = req.query.secret;

    console.log(req.query);
  }
};

module.exports = api;