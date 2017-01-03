const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dir: '.', dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  // Register the lang root route.
  server.get('/:lang', (req, res) => {
    return app.render(req, res, '/', req.params)
  })

  // Redirect root to default language if not passed.
  server.get('/', (req, res) => {
    res.redirect('/fi/')
  })

  // Handle other requests.
  server.get('*', (req, res) => {
    return handle(req, res)
  })

  // Start server.
  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
