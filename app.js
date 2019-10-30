const express = require('express')

const app = express()

const router = require('./router')

app.use(express.static('./public'))

app.use('/route', router)

app.use('text', (req, res) => {
  res.send({'state': true})
})

app.listen(9099, () => {
  console.log('Server at 9099')
})
