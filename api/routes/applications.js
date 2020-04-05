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
    router.route('/current').get(getCurrentApplication);
    router.route('/').get(listApplications);
    router.route('/qr_code').get(applicationQRCode);
    router.route('/').post(createApplication);
    router.route('/finish').post(finishApplication);
    router.route('/').delete(deleteApplicationByDeviceToken);
    router.route('/:application_id').delete(deleteApplicationById);
}

async function getCurrentApplication(req, res) {
    const deviceToken = req.query.device_token;

    const application = await applicationController.getCurrentApplication(deviceToken);
    if (_isEmpty(application)) {
        return response.error(res, 404, "Տվյալները չեն գտնվել");
    }

    return response.success(res, 200, application);
}

async function listApplications(req, res) {
    const deviceToken = req.query.device_token;

    const applications = await applicationController.getApplicationsList(deviceToken);

    return response.success(res, 200, applications);
}

async function applicationQRCode(req, res) {
    const deviceToken = req.query.device_token;

    const application = await applicationController.getApplication(deviceToken);
    if (_isEmpty(application)) {
        return response.error(res, 404, "Տվյալները չեն գտնվել");
    }

    // const device_token = application.dataValues.device_token;
    // const domain = process.env.PUBLIC_URL + ':' + process.env.PORT;
    // const url = domain + '/' + deviceToken + '.png';
    // const filePath = path.join(__dirname, './../../qr-codes' + '/' + deviceToken + '.png');

    const code = qrImage.image('test', { type: 'png' });
    res.type('png');
    code.pipe(res);
}

async function createApplication(req, res) {
    return response.success(res, 200, 'success');
}

async function finishApplication(req, res) {
    return response.success(res, 200, 'success');
}

async function deleteApplicationByDeviceToken(req, res) {
    return response.success(res, 200, 'success');
}

async function deleteApplicationById(req, res) {
    return response.success(res, 200, 'success');
}

init();
module.exports = router;
