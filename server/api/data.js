module.exports = function (router) {
  router.all('/', function (req, res) {
    res.send({
      response: 'Hello World API'
    })
  });
};

