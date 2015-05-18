var Promise = require('bluebird');
var mysql = Promise.promisifyAll(require('mysql'));
var debug = require('debug')('database');

var databaseUrl = process.env.ETHERSHIFT_DATABASE_URL;
if(!databaseUrl) throw new Error('must set ETHERSHIFT_DATABASE_URL');
console.log('Connecting to database', databaseUrl);

var connection = mysql.createConnection(databaseUrl);
connection.connect();

var database = {
  findOrderByDepositAddres: function (depositAddress) {
    return new Promise(function (resolve, reject) {
      connection.query('SELECT * FROM  `order` WHERE deposit_address = ?',
        [depositAddress], function (err, rows) {
          if (err) {
            return reject(err);
          } else {
            return resolve(rows);
          }
        });
    });
  },
  saveOrder: function (rate, depositAddress, withdrawalAddress, ipAddress) {
    return new Promise(function (resolve, reject) {
      connection.query('INSERT INTO `order` (rate, deposit_address, withdrawal_address, ip_address, created_at, updated_at) ' +
      'VALUES (?, ?, ?, ?, NOW(), NOW())',
        [rate, depositAddress, withdrawalAddress, ipAddress], function (err, rows) {
          if (err) {
            return reject(err);
          } else {
            return resolve(rows);
          }
        });
    });
  },
  saveDeposit: function (orderId, depositHash, satoshis) {
    return new Promise(function (resolve, reject) {
      connection.query('INSERT INTO `deposit` (order_id, deposit_hash, satoshis, created_at, updated_at) ' +
      'VALUES (?, ?, ?, NOW(), NOW())',
        [orderId, depositHash, satoshis], function (err, rows) {
          if (err) {
            return reject(err);
          } else {
            return resolve(rows);
          }
        });
    });
  }
};

module.exports = database;
