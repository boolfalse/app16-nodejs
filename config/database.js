
const mysql = require('mysql');
const db_env = process.env.NODE_ENV;

if (db_env === 'development') {
    module.exports = mysql.createPool({
        connectionLimit: 100,
        host: process.env.LOCAL_DB_HOST,
        user: process.env.LOCAL_DB_USER,
        password: process.env.LOCAL_DB_PASS,
        database: process.env.LOCAL_DB_NAME,
        dateStrings: 'date',
        multipleStatements: true,
    });
} else {
    module.exports = mysql.createPool({
        connectionLimit: 100,
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        dateStrings: 'date',
        multipleStatements: true,
    });
}
