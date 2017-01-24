const h = require('./server.helpers.js')
const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dir: '.', dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  // Register the lang root route.
  server.get('/:language', (req, res) => {
    console.log('Serving: ', req.url)

    h.getAvailableLanguages().then(result => {
      console.log('Available languages', Object.keys(result.languages))
      if (result.languages[req.params.language]) {
        console.log('Calling app.render()')
        return app.render(req, res, '/', req.params)
      } else {
        console.log('Calling handle()')
        return handle(req, res)
      }
    })
  })

  // Redirect root to default language if not passed.
  server.get('/', (req, res) => {
    console.log('Serving: ', req.url)
    console.log('Redirecting to /fi/')
    res.redirect('/fi/')
  })

  // Handle other requests.
  server.get('*', (req, res) => {
    console.log('Serving: ', req.url)
    console.log('Calling handle()')
    return handle(req, res)
  })

  // Start server.
  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
