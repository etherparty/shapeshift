var Promise = require('bluebird');
var mysql = Promise.promisifyAll(require('mysql'));

var databaseUrl = process.env.ETHERSHIFT_DATABASE_URL;
if(!databaseUrl) throw new Error('must set ETHERSHIFT_DATABASE_URL');
console.log('Connecting to database', databaseUrl);

var connection = mysql.createConnection(databaseUrl);
connection.connect();

var database = {
  saveOrder: function (rate, depositAddress, withdrawalAddress, ipAddress) {
    return new Promise(function (resolve, reject) {
      connection.query('INSERT INTO `order` (rate, deposit_address, withdrawal_address, ip_address) VALUES (?, ?, ?, ?)',
        [rate, depositAddress, withdrawalAddress, ipAddress], function (err, rows) {
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
