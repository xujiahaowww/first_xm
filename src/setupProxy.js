/*setupProxy.js*/
//http-proxy-middleware不需要手动引入，在搭建脚手架的时候已经自动引入了
const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
  app.use('/PT', createProxyMiddleware({
    secure: false,
    target: 'https://appcs.jbysoft.com',
    changeOrigin: true,
  }))
  app.use('/DM', createProxyMiddleware({
    target: 'https://appcs.jbysoft.com',
    changeOrigin: true,
  }))
  app.use('/Zzjg', createProxyMiddleware({
    target: 'https://appcs.jbysoft.com',
    changeOrigin: true,
  }))
 
}

