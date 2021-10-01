var router = require('express').Router();
const Timers = require('../models/timers');

// import middleware functions here
// var logUserAction = middlewares.logUserAction;
  
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const timer = await Timers.fetchTimer(id);

    return res.json({
        'status' : 'success',
        'timer' : timer
    });
});

router.get('/', async (req, res) => {
    const { timers, count } = await Timers.fetchTimers();

    return res.json({
        'status' : 'success',
        'timers' : timers,
        'count' : count
    });
});

router.post('/', async (req, res) => {
    const name = req.body.name;
    const duration = req.body.duration;
    const webhook_url = req.body.webhook_url;
    const timer = await Timers.createTimer(name, duration, webhook_url);

    return res.json({
        'status' : 'success',
        'timer' : timer
    });
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const timer = await Timers.updateTimer(id, status);

    return res.json({
        'status' : 'success',
        'timer' : timer
    });
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const response = await Timers.deleteTimer(id);

    return res.json({
        'status' : 'success'
    });
});

module.exports = router;
