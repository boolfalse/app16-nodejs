'use strict';

const express = require('express');
const _isEmpty = require('lodash/isEmpty');

const applicationController = require('../controllers/application');
const response = require('../../common/response');

const schemas = require('../schemas/applicationsValidationSchema');
const iValidator = require('../../common/iValidator');

const router = express.Router();

function init() {
    router.route('/get').get(getApplications);
    router.route('/create').post(insertApplication);
}

async function getApplications(req, res) {
    const data = await applicationController.getApplications(req.user.id);

    if (_isEmpty(data)) {
        return response.error(res, 404, "No Applications yet.");
    }

    return response.success(res, 200, data);
}

async function insertApplication(req, res) {
    const {scheduleObject} = req.body;

    if (_isEmpty(scheduleObject)) {
        return response.error(res, 422, 'scheduleObject object not present.');
    }

    const json_format = iValidator.json_schema(schemas.postSchema, scheduleObject);
    if (json_format.valid === false) {
        return response.error(res, 422, json_format.errorMessage.error.details.messages);
    }

    const data = await applicationController.insertApplication(req.user.id, scheduleObject);

    if (_isEmpty(data)) {
        return response.error(res, 404, '{"status": 1}');
    }

    return response.success(res, 200, "success");
}

init();
module.exports = router;
