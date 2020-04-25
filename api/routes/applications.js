'use strict';

const express = require('express');
const _isEmpty = require('lodash/isEmpty');
const path = require('path');
const qrImage = require('qr-image');
const validator = require('validator');
const moment = require('moment');

const applicationController = require('../controllers/application');
const response = require('../../common/response');

const schemas = require('../schemas/applicationsValidationSchema');
const iValidator = require('../../common/iValidator');

const router = express.Router();

function init() {
    router.route('/current').get(getCurrentApplication);
    router.route('/').get(listApplications);
    router.route('/qr_code').get(applicationQRCode);
    router.route('/').post(createApplication);
    router.route('/finish').post(finishApplication);
    router.route('/').delete(deleteApplicationByDeviceToken);
    router.route('/:application_id').delete(deleteApplicationById);
}

async function getCurrentApplication(req, res) {
    if (_isEmpty(req.query)) {
        return response.errorWithFields(res, 422, "Device token was not entered!", [
            'device_token'
        ]);
    }

    const deviceToken = req.query.device_token;
    // TODO: Add and use config variable for "device_token"
    if (validator.isEmpty(deviceToken) || deviceToken.length < 3) {
        return response.errorWithFields(res, 422, "Device token not valid!", [
            'device_token'
        ]);
    }

    const application = await applicationController.getCurrentApplication(deviceToken);
    if (_isEmpty(application)) {
        return response.error(res, 404, "Not found!");
    }

    return response.success(res, 200, application);
}

async function listApplications(req, res) {
    if (_isEmpty(req.query)) {
        return response.errorWithFields(res, 422, "Device token was not entered!", [
            'device_token'
        ]);
    }

    const deviceToken = req.query.device_token;
    // TODO: Add and use config variable for "device_token"
    if (validator.isEmpty(deviceToken) || deviceToken.length < 3) {
        return response.errorWithFields(res, 422, "Device token not valid!", [
            'device_token'
        ]);
    }

    const applications = await applicationController.getApplicationsList(deviceToken);

    return response.success(res, 200, applications);
}

async function applicationQRCode(req, res) {
    if (_isEmpty(req.query)) {
        return response.errorWithFields(res, 422, "Device token was not entered!", [
            'device_token'
        ]);
    }

    const deviceToken = req.query.device_token;
    // TODO: Add and use config variable for "device_token"
    if (validator.isEmpty(deviceToken) || deviceToken.length < 3) {
        return response.errorWithFields(res, 422, "Device token not valid!", [
            'device_token'
        ]);
    }

    const application = await applicationController.getApplication(deviceToken);
    if (_isEmpty(application)) {
        return response.error(res, 404, "Not found!");
    }

    const qrInputString = applicationController.generateQRInputString(application.dataValues);
    const code = qrImage.image(qrInputString, {
        type: 'png',
        size: 7,
        margin: 1
    });
    res.type('png');

    code.pipe(res);
}

async function createApplication(req, res) {
    const data = req.body;
    if (_isEmpty(data)) {
        return response.errorWithFields(res, 422, "Data not entered!", []);
    }

    if (
        data.device_token.length < 3 ||
        data.first_name.length < 1 ||
        data.middle_name.length < 1 ||
        data.last_name.length < 1 ||
        data.out_address.length < 3 ||
        data.visiting_address_and_name.length < 3 ||
        data.visiting_reason.length < 3
    ) {
        return response.errorWithFields(res, 422, "Entered data not valid!", []);
    }

    const now = moment.now();
    const outDatetime = moment(data.out_datetime, "YYYY-MM-DD HH:mm:ss");
    const plannedReturnDatetime = moment(data.planned_return_datetime, "YYYY-MM-DD HH:mm:ss");
    if (!outDatetime.isValid() || !plannedReturnDatetime.isValid()) {
        return response.errorWithFields(res, 422, "Dates not valid!", []);
    }
    if (outDatetime.diff(now) < 0 || plannedReturnDatetime.diff(outDatetime) < 0) {
        return response.errorWithFields(res, 422, "Dates not valid!", []);
    }

    const existingApplication = await applicationController.getCurrentApplication(data.device_token);
    if (existingApplication) {
        return response.error(res, 409, "Already exists!");
    }

    const application = await applicationController.createApplication(data);

    return response.success(res, 200, application);
}

async function finishApplication(req, res) {
    const deviceToken = req.body.device_token;

    if (!deviceToken) {
        return response.error(res, 404, "Not found!");
    }

    const application = await applicationController.finishApplication(deviceToken);

    if (application) {
        return response.success(res, 200, application);
    } else {
        return response.error(res, 404, "Not found!");
    }
}

async function deleteApplicationByDeviceToken(req, res) {
    const deviceToken = req.body.device_token;

    const errorFields = [];
    if (!deviceToken) {
        errorFields.push({
            'key': 'device_token',
            'messages': [
                "The device token field is required."
            ]
        });
    }

    if (errorFields.length > 0) {
        const errorMessage = "Not all fields was entered!";
        return response.errorWithFields(res, 422, errorMessage, errorFields);
    }

    const deleted = await applicationController.deleteApplicationByDeviceToken(deviceToken);

    return response.success(res, 200, {
        'deleted': deleted
    });
}

async function deleteApplicationById(req, res) {
    const deviceToken = req.body.device_token;

    const errorFields = [];
    if (!deviceToken) {
        errorFields.push({
            'key': 'device_token',
            'messages': [
                "The device token field is required."
            ]
        });
    }

    if (errorFields.length > 0) {
        const errorMessage = "Not all fields was entered!";
        return response.errorWithFields(res, 422, errorMessage, errorFields);
    }

    const deleted = await applicationController.deleteApplicationById(deviceToken);

    return response.success(res, 200, {
        'deleted': deleted
    });
}

init();
module.exports = router;
