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
  }
};

module.exports = api;