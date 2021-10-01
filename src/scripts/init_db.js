const { pgPoolClientDefault } = require('../db/db_clients.js');

// Status Enum can be from : running, paused, resumed, completed
const StatusEnumQuery = `CREATE TYPE StatusEnum AS ENUM('running', 'paused', 'resumed', 'completed');`

// Action Enum can be from : create, pause, resume, end
const ActionEnumQuery = `CREATE TYPE ActionEnum AS ENUM('create', 'pause', 'resume', 'end');`

// duration in seconds
const timers = `CREATE TABLE timers (
	id UUID PRIMARY KEY,
    created_at timestamp NOT NULL DEFAULT now(),
	name text,
    duration integer,
    total_time_clocked integer,
	last_updated_at timestamp NOT NULL DEFAULT now(),
    status StatusEnum DEFAULT NULL
);`

const actions = `CREATE TABLE actions (
	id UUID PRIMARY KEY,
    timer_id UUID REFERENCES timers (id),
    created_at timestamp NOT NULL DEFAULT now(),
	action_name ActionEnum DEFAULT NULL
);`

const TABLES = [timers, actions];
const TABLES_NAMES = ["timers", "actions"];


const doesDBExists = () => {
    const query = "select exists( SELECT datname FROM pg_catalog.pg_database WHERE lower(datname) = lower('pomodoro') )"
    return pgPoolClientDefault.query(query).then(function({ rows }){
        return rows[0]['exists']
    }).catch(function(error){
        console.log("error inside doesDBExists", error);
        return true
    })
}

const createDatabase = async () => {
    const db_exists = await doesDBExists();
    if (!db_exists) {
        return pgPoolClientDefault.query('CREATE DATABASE pomodoro').then(() => {
            console.log("created pomodoro db");
            return true
        });
    }
    else{
        console.log("db already exists");
        return false
    }
}

const createTables = async () => {
    const { pgPoolClient } = require('../db/db_clients.js');

    const createEnumType = (enum_query) => {
        return pgPoolClient.query(enum_query)
    };

    const createTable = (create_table_query) => {
        return pgPoolClient.query(create_table_query)
    }

    const grantPermissions = (table_name) => {
        return pgPoolClient.query(`GRANT ALL PRIVILEGES ON TABLE ${table_name} to "group";`)
    }

    const create_enum_promises = [StatusEnumQuery, ActionEnumQuery].map((enum_query) => {
        return createEnumType(enum_query)
    });

    await Promise.all(create_enum_promises);

    await createTable(timers)
    await createTable(actions)

    const grant_permission_promises = TABLES_NAMES.map((table_name) => {
        return grantPermissions(table_name);
    })

    await Promise.all(grant_permission_promises);

    console.log("created datatables");
}

const initDB = async () => {
    try {
        const is_db_created = await createDatabase();
        if (is_db_created){
            await createTables();
        }
    }
    catch(err) {
        console.log("error", err)        
    }
}

initDB();