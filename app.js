const express = require('express');

const app = express()

app.use(9090, (req, res) => {
  res.send({'state': true})
})

app.listen(9099, () => {
  console.log('Server at 9099');
})
