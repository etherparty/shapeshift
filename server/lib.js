var crypto = require('crypto');

var lib = {
  createSignature: function (id) {
    return crypto.createHmac('sha256', process.env.ETHERSHIFT_SECRET)
      .update(String(id))
      .digest('hex');
  }
}

module.exports = lib;