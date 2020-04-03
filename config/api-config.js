
const hpp = require('hpp');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const express = require('express');

const app = express();

const dbFunc = require('./db-function');

const MainRoutes = require('../api/routes/main');
const ApplicationRoutes = require('../api/routes/applications');

dbFunc.connectionCheck.then((data) => {
}).catch((err) => {
    console.log(err);
});

if (process.env.NODE_ENV === 'development') {
    app.use(cors({
        origin: true,
        credentials: true,
    }));
    app.use(morgan('dev'));
} else {
    app.use(hpp());
    app.use(helmet());
    app.use(morgan('combined'));
    app.use(cors({
        origin: true,
        credentials: true,
    }));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', MainRoutes);
app.use('/api/v1/applications', ApplicationRoutes);

// app.use(express.static('uploads'));

process.on('uncaughtException', function(err) {
    console.error((new Date).toUTCString() + ' uncaughtException:', err.message);
    console.error(err.stack);

    if (process.env.NODE_ENV === 'development') {
        console.log(err);
    }

    process.exit(1);
});

process.on('unhandledRejection', function(reason, promise) {
    console.error('unhandled rejection:', reason);

    if (process.env.NODE_ENV === 'development') {
        console.log(reason);
    }
});

const ApiConfig = {
    app: app
};

module.exports = ApiConfig;
