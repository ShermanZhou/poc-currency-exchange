const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://127.0.0.1:8080',
      changeOrigin: true,
      secure: false,
      pathRewrite: {
        '^/api/': '/'
      },
      router: {
        'localhost:3000':'http://localhost:8080'
      }
    })
  )
}