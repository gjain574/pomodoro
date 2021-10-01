const { Pool } = require('pg');
const CONSTANTS = require("../utils/constants.js");

var pgPoolClient = new Pool({
	user: CONSTANTS.PG.USER,
	host: CONSTANTS.PG.HOST,
	database: CONSTANTS.PG.DATABASE,
	password: CONSTANTS.PG.PASSWORD,
	port: CONSTANTS.PG.PORT,
});

module.exports.pgPoolClient = pgPoolClient

var pgPoolClientDefault = new Pool({
	user: CONSTANTS.PG.USER,
	host: CONSTANTS.PG.HOST,
	database: CONSTANTS.PG.DEFAULT_DATABASE,
	password: CONSTANTS.PG.PASSWORD,
	port: CONSTANTS.PG.PORT,
});

module.exports.pgPoolClientDefault = pgPoolClientDefault