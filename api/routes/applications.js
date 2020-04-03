'use strict';

const express = require('express');
const _isEmpty = require('lodash/isEmpty');

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
    return response.success(res, 200, 'success');
}

async function listApplications(req, res) {
    return response.success(res, 200, 'success');
}

async function applicationQRCode(req, res) {
    return response.success(res, 200, 'success');
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
