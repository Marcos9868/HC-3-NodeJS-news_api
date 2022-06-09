const router = require('express')

const statusRoute = router()

statusRoute.get('/news-api/v1/status', (req, res) => {
  res.send({
    message: 'OK',
    apiName: 'news-api',
    version: 1.0,
    author: 'Marcos M. Ferreira'
  })
})

module.exports = statusRoute