'use strict';

const express = require('express');
const response = require('../../common/response');
const router = express.Router();

function init() {
    router.route('/').get(mainUrl);
}

async function mainUrl(req, res) {
    return response.error(res, 404, "Main Page. Results not found!");
}

init();
module.exports = router;
