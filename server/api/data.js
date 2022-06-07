const os = require('os')

module.exports = function (router) {
  router.all('/', function (req, res) {
    res.send({
      response: `API Response From: ${os.hostname()}`
    })
  });
};

