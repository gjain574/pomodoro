const Moment = require('moment');
const { pgPoolClient } = require('../db/db_clients.js');
const Timers = require('../models/timers');
const axios = require('axios').default;

const findRunningTimers = async () => {
    const { rows, rowCount } = await pgPoolClient.query(`SELECT * FROM timers WHERE status IN ('resumed', 'running') LIMIT 1000`);
    const updated_rows = Timers.calculateTimeRemaining(rows);
    return updated_rows
}

const updateTimer = (id, duration) => {
    pgPoolClient.query(`
        UPDATE timers 
        SET status = 'completed', last_updated_at = now(), total_time_clocked = ${duration}
        WHERE id = '${id}';
    `);
}

const notifyWebHook = (id, webhook_url) => {
    axios.post(webhook_url, {
        id: id, 
        status: 'completed'
    });
}

const startBatch = async () => {
	const updated_rows = await findRunningTimers();

    updated_rows.forEach((row) => {

        if (row.time_remaining <= 0){
            console.log('stopped this timer');
            updateTimer(row.id, row.duration);

            if (row.webhook_url.length > 0){
                console.log('notified webhook');
                notifyWebHook(row.id, row)
            }
        }
        
    })
}

startBatch().then(function(){
	setInterval(function() {
		startBatch()
	}, 1000);
})
