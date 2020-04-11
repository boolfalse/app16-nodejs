'use strict';

const express = require('express');
const response = require('../../common/response');
const router = express.Router();

function init() {
    router.route('/').get(mainUrl);
}

async function mainUrl(req, res) {
    return response.success(res, 200, "All is OK. The app running successfully...");
}

init();
module.exports = router;
