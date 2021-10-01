var router = require('express').Router();
var path = require('path');

router.use('/api/v1/timers', require('./timer.js'));

router.get('*', async (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../build', 'index.html'))
})

module.exports = router;