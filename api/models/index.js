
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);

const env = process.env.NODE_ENV;
let config;
if (env === 'development') {
    config = {
        username: process.env.DEVELOPMENT_DB_USER,
        password: process.env.DEVELOPMENT_DB_PASS,
        database: process.env.DEVELOPMENT_DB_NAME,
        host: process.env.DEVELOPMENT_DB_HOST,
        dialect: 'mysql'
    };
} else {
    config = {
        username: process.env.PRODUCTION_DB_USER,
        password: process.env.PRODUCTION_DB_PASS,
        database: process.env.PRODUCTION_DB_NAME,
        host: process.env.PRODUCTION_DB_HOST,
        dialect: 'mysql'
    };
}

const Op = Sequelize.Op;
const operatorsAliases = {
    $notIn: Op.notIn,
    $and: Op.and,
    $gte: Op.gte,
    $lte: Op.lte,
    $not: Op.not,
    $or: Op.or,
    $in: Op.in,
    $ne: Op.ne,
};

const db = {};
const sequelize = new Sequelize(config.database, config.username, config.password, {...config, operatorsAliases});

fs
    .readdirSync(__dirname)
    .filter((file) => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach((file) => {
        const model = sequelize['import'](path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }

    db[modelName]['generateNestedQuery'] = query => {
        return sequelize.literal(
            `(${sequelize
                .getQueryInterface()
                .QueryGenerator.selectQuery(db[modelName].getTableName(), query)
                .slice(0, -1)})`
        );
    };
});

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
})
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

db.sequelize = sequelize;

module.exports = db;
