var crypto = require('crypto');
var axios = require('axios');
var Promise = require('bluebird');

var blockchainID = process.env.ETHERSHIFT_BLOCKCHAIN_ID;
var blockchainPassword1 = process.env.ETHERSHIFT_BLOCKCHAIN_PASSWORD_1;
var blockchainPassword2 = process.env.ETHERSHIFT_BLOCKCHAIN_PASSWORD_2;

if (!blockchainID) throw new Error('must set ETHERSHIFT_BLOCKCHAIN_ID');
if (!blockchainPassword1) throw new Error('must set ETHERSHIFT_BLOCKCHAIN_PASSWORD_1');
if (!blockchainPassword2) throw new Error('must set ETHERSHIFT_BLOCKCHAIN_PASSWORD_2');

var lib = {
  createDepositAddress: function (label) {
    var url = 'https://blockchain.info/merchant/' + blockchainID + '/new_address?password=' + blockchainPassword1 + '&second_password=' + blockchainPassword2 + '&label=' + label;

    return axios.post(url);
  }
};

module.exports = lib;