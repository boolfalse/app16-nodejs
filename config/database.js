
const mysql = require('mysql');
const db_env = process.env.NODE_ENV;

if (db_env === 'development') {
    module.exports = mysql.createPool({
        connectionLimit: 100,
        host: process.env.DEVELOPMENT_DB_HOST,
        user: process.env.DEVELOPMENT_DB_USER,
        password: process.env.DEVELOPMENT_DB_PASS,
        database: process.env.DEVELOPMENT_DB_NAME,
        dateStrings: 'date',
        multipleStatements: true,
    });
} else {
    module.exports = mysql.createPool({
        connectionLimit: 100,
        host: process.env.PRODUCTION_DB_HOST,
        user: process.env.PRODUCTION_DB_USER,
        password: process.env.PRODUCTION_DB_PASS,
        database: process.env.PRODUCTION_DB_NAME,
        dateStrings: 'date',
        multipleStatements: true,
    });
}
