const express = require('express');
const path = require('path');
const server = express();
const enrouten = require('express-enrouten')
const { createProxyMiddleware } = require('http-proxy-middleware');

const port = parseInt(process.env.PORT, 10) || 3000

// api
server.use('/api', enrouten({ directory: 'api'}))

// proxy druid example
/*
console.log('DRUID=', process.env.DRUID)
server.use('/druid', createProxyMiddleware({ target: process.env.DRUID, changeOrigin: true }));
*/

// static
server.use(express.static(path.join(__dirname, '../dist')));
server.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

server.listen(port, (err) => {
  if (err) throw err
  console.log(`> Ready on port:${port}`)
})