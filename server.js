
require('dotenv').config();

const apis = require('./config/api-config');
const http = require('http');

http.createServer(apis.app).listen(process.env.PORT);


// const https = require('https');
// const fs = require('fs');

// const ssl_options = {
//     key: fs.readFileSync('cert/key.pem'),
//     cert: fs.readFileSync('cert/cert.pem')
// };
// https.createServer(ssl_options, apis.app).listen(process.env.SSL_PORT);
