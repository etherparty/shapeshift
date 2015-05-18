var crypto = require('crypto');
var axios = require('axios');
var Promise = require('bluebird');
var BigNumber = require('bignumber.js');
var web3 = require('web3');
web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));

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
  },
  getRate: function () {
    return 100; // 1 BTC = 100 Ether
  },
  satoshiToEther: function (rate, satoshi) {
    var btc = satoshi / 1e8;

    return new BigNumber(btc).times(rate).toNumber();
  },
  sendEther: function (amount, address) {
    return new Promise(function (resolve, reject) {
      web3.eth.sendTransaction({
        from: web3.eth.coinbase,
        to: address,
        value: web3.toWei(amount, 'ether')
      }, function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
};

module.exports = lib;
