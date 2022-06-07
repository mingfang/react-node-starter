const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common,{
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    allowedHosts: 'all',
    client: {
      webSocketURL: 'auto://0.0.0.0:0/ws',
    },
    historyApiFallback: true,
    port: 3000,
    proxy: {
      '/api': {
        changeOrigin: true,
        target: 'http://localhost:3001',
      },
    },
  },
})