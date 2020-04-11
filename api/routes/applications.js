'use strict';

const express = require('express');
const _isEmpty = require('lodash/isEmpty');
const path = require('path');
const qrImage = require('qr-image');

const applicationController = require('../controllers/application');
const response = require('../../common/response');

const schemas = require('../schemas/applicationsValidationSchema');
const iValidator = require('../../common/iValidator');

const router = express.Router();

function init() {
    router.route('/current').get(currentApplication);
    router.route('/').get(listApplications);
    router.route('/qr_code').get(applicationQRCode);
    router.route('/').post(createApplication);
    router.route('/finish').post(finishApplication);
    router.route('/').delete(deleteApplicationByDeviceToken);
    router.route('/:application_id').delete(deleteApplicationById);
}

async function currentApplication(req, res) {
    const errorMessage = await applicationController.validateCurrentApplication(req.query);
    if (errorMessage) {
        return response.error(res, 404, errorMessage);
    }

    const data = await applicationController.currentApplication(req.query.device_token);
    if (data.error) {
        return response.error(res, 404, data.message);
    }

    return response.success(res, 200, data.output);
}

async function listApplications(req, res) {
    const errorMessage = await applicationController.validateListApplications(req.query);
    if (errorMessage) {
        return response.error(res, 404, errorMessage);
    }

    const data = await applicationController.applicationsList(req.query.device_token);

    return response.success(res, 200, data.output);
}

async function applicationQRCode(req, res) {
    const deviceToken = req.query.device_token;

    const application = await applicationController.getApplication(deviceToken);
    if (_isEmpty(application)) {
        return response.error(res, 404, "Տվյալները չեն գտնվել");
    }

    const qrInputString = applicationController.generateQRInputString(application.dataValues);
    const code = qrImage.image(qrInputString, { type: 'png' });
    res.type('png');

    code.pipe(res);
}

async function createApplication(req, res) {
    const data = req.body;

    const application = await applicationController.createApplication(data);

    return response.success(res, 200, application);
}

async function finishApplication(req, res) {
    const deviceToken = req.body.device_token;

    if (!deviceToken) {
        return response.error(res, 404, "Տվյալները չեն գտնվել");
    }

    const application = await applicationController.finishApplication(deviceToken);

    if (application) {
        return response.success(res, 200, application);
    } else {
        return response.error(res, 404, "Տվյալները չեն գտնվել");
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
        const errorMessage = "Դուք ունեք սխալ լրացված դաշտեր";
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
        const errorMessage = "Դուք ունեք սխալ լրացված դաշտեր";
        return response.errorWithFields(res, 422, errorMessage, errorFields);
    }

    const deleted = await applicationController.deleteApplicationById(deviceToken);

    return response.success(res, 200, {
        'deleted': deleted
    });
}

init();
module.exports = router;
