const Moment = require('moment');
const { v4: uuidv4 } = require('uuid');
const { pgPoolClient } = require('../db/db_clients');

const calculateTimeRemaining = (rows) => {
	return rows.map((row) => {
		const { created_at, duration, total_time_clocked, last_updated_at, status } = row;

		let time_passed;
		let time_remaining;

		switch (status){
			case 'running':
				time_passed = Moment().unix() - Moment(created_at).unix();
				time_remaining = duration - time_passed;
				break;
			case 'paused':
				time_passed = total_time_clocked;
				time_remaining = duration - time_passed;
				break;
			case 'resumed':
				time_passed = Moment().unix() - Moment(last_updated_at).unix() + total_time_clocked;
				time_remaining = duration - time_passed;
				break;
			case 'completed':
				time_remaining = 0;
				break;
		}
		row['time_remaining'] = time_remaining;
		return row
	})
}

module.exports.calculateTimeRemaining = calculateTimeRemaining;

// fetch a single timer and its info
const fetchTimer = async (id) => {
	const { rows, rowCount } = await pgPoolClient.query(`SELECT * FROM timers WHERE id = '${id}';`);
	const updated_rows = calculateTimeRemaining(rows);
	return updated_rows[0]
}

module.exports.fetchTimer = fetchTimer;

// default duration is 25 mins ~ 1500 seconds
const createTimer = async (name, duration = 1500, webhook_url = '') => {
	const id = uuidv4();
	try {
		const { rows } = await pgPoolClient.query(`INSERT INTO timers 
			(
				id,
				name,
				duration,
				total_time_clocked,
				webhook_url,
				status
			)

			VALUES 
			( 
				'${id}', 
				'${name}',
				${duration},
				${0},
				'${webhook_url}',
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
	const updated_rows = calculateTimeRemaining(rows);
	return { count: rowCount, timers: updated_rows }
}

module.exports.fetchTimers = fetchTimers;

// The below function will be responsible for both resuming and pausing a timer.
const updateTimer = async (id, status) => {

	const response_data = await pgPoolClient.query(`SELECT * FROM timers WHERE id = '${id}';`);

	if (response_data.rowCount === 1){
		const { last_updated_at, total_time_clocked } = response_data.rows[0];
		const updated_total_time_clocked = Moment().unix() - Moment(last_updated_at).unix() + total_time_clocked;
		let query;
		if (status === "paused"){
			query = `
				UPDATE timers 
				SET status = '${status}', last_updated_at = now(), total_time_clocked = ${updated_total_time_clocked}
				WHERE id = '${id}'
				RETURNING *;
			`;
		}
		else if (status === "resumed"){
			query = `
				UPDATE timers 
				SET status = '${status}', last_updated_at = now()
				WHERE id = '${id}'
				RETURNING *;
			`;
		}
	
		const { rows } = await pgPoolClient.query(query);
		const updated_rows = calculateTimeRemaining(rows);
		return updated_rows[0]
	}
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