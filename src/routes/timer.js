var router = require('express').Router();
const Timers = require('../models/timers');
  
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const timer = await Timers.fetchTimer(id);
        return res.json({
            'status' : 'success',
            'timer' : timer
        });
    }
    catch(error) {
        return res.status(404).json({
            'status' : 'fail',
            'error' : 'resource does not exists'
        });
    }
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
    try {
        const { status } = req.body;
        const timer = await Timers.updateTimer(id, status);
    
        return res.json({
            'status' : 'success',
            'timer' : timer
        });
    }
    catch(error) {
        return res.status(400).json({
            'status' : 'fail',
            'error' : error.toString()
        });
    }
});

router.delete('/:id', async (req, res) => {
    try{
        const { id } = req.params;
        const response = await Timers.deleteTimer(id);
    
        return res.json({
            'status' : 'success'
        });
    }
    catch(error) {
        return res.status(404).json({
            'status' : 'fail',
            'error' : 'resource does not exists'
        });
    }
});

module.exports = router;
