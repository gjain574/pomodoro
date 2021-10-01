const Moment = require('moment');
const { v4: uuidv4 } = require('uuid');
const { pgPoolClient } = require('../db/db_clients');


// fetch a single timer and its info
const fetchTimer = async (id) => {
	const { rows, rowCount } = await pgPoolClient.query(`SELECT * FROM timers WHERE id = '${id}';`);
	return rows[0]
}

module.exports.fetchTimer = fetchTimer;

// default duration is 25 mins ~ 1500 seconds
const createTimer = async (name, duration = 1500) => {
	const id = uuidv4();
	try {
		const { rows } = await pgPoolClient.query(`INSERT INTO timers 
			(
				id,
				name,
				duration,
				total_time_clocked,
				status
			)

			VALUES 
			( 
				'${id}', 
				'${name}',
				${duration},
				${0},
				'running'
			)

			RETURNING *
		`)

		return rows[0]
	}
	catch(error) {
		console.log(error)
	}
}

module.exports.createTimer = createTimer;

// fetch list of all timers sorted by created_date
const fetchTimers = async () => {
	const { rows, rowCount } = await pgPoolClient.query(`SELECT * FROM timers ORDER BY created_at DESC LIMIT 10;`);
	return { count: rowCount, timers: rows }
}

module.exports.fetchTimers = fetchTimers;

// The below function will be responsible for both resuming and pausing a timer.
const updateTimer = async (id, status) => {
	const { rows } = await pgPoolClient.query(`
		UPDATE timers 
		SET status = '${status}', last_updated_at = now()
		WHERE id = '${id}'
		RETURNING *;
	`)
	return rows[0]
}

module.exports.updateTimer = updateTimer;

const deleteTimer = async (id) => {
	const response = await pgPoolClient.query(`
		DELETE FROM timers 
		WHERE id = '${id}'
		RETURNING *;
	`)
	
	return response
}

module.exports.deleteTimer = deleteTimer;