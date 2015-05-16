var axios = require('axios');
var Promise = require('bluebird');
var lib = require('./lib');
var database = require('./database');

var depositSecret = process.env.ETHERSHIFT_BLOCKCHAIN_SECRET;
if (!depositSecret) throw new Error('must set ETHERSHIFT_BLOCKCHAIN_SECRET');

var api = {
  getRate: function (req, res) {
    return res.json({
      rate: lib.getRate()
    });
  },
  createOrder: function (req, res) {
    var withdrawalAddress = req.query.withdrawalAddress;

    if (!withdrawalAddress) return res.json({
      error: 'No withdrawalAddress specified'
    });

    lib.createDepositAddress(withdrawalAddress)
      .then(function (response) {
        if (response.data && response.data.address) {
          return Promise.resolve(response.data.address);
        } else {
          throw Error('Blockchain did not return address instead got ' + JSON.stringify(response.data));
        }
      })
      .then(function (depositAddress) {
        return database.saveOrder(lib.getRate(), depositAddress, withdrawalAddress, req.ip)
          .then(function (result) {
            return res.json({
              address: depositAddress
            });
          });
      })
      .catch(function (err) {
        console.error('createDepositAddress error', err);

        return res.json({
          error: 'Could not create deposit address'
        });
      });
  },
  deposit: function (req, res) {
    var secret = req.query.secret;
    if (secret != depositSecret) return res.send('*ok*');

    var amount = req.query.value;
    var address = req.query.input_address;
    var hash = req.query.transaction_hash;
    var confirmations = req.query.confirmations;
    var confirmed = (confirmations > 0) ? true : false;

    console.log(req.query);

    if (confirmed) {
      return res.ok('*ok*');
    }
  }
};

module.exports = api;
