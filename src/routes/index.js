var router = require('express').Router();
var path = require('path');

router.use('/api/v1/timers', require('./timer.js'));

// router.get('*', function(req, res) {
//   res.sendFile(path.resolve(__dirname, '../../client/dist', 'index.html'))
// })

module.exports = router;