'use strict';

const applicationFormatter = require('../../api/helpers/applicationFormatter');

const {
    Application,
} = require('../models/');

class ApplicationController {

    static async getCurrentApplication(deviceToken) {
        const application = await Application.findOne({
            where: {
                device_token: deviceToken,
                finished_at: null
            },
            attributes: [
                'id',
                'first_name',
                'middle_name',
                'last_name',
                'out_address',
                'out_datetime',
                'visiting_address_and_name',
                'visiting_reason',
                'planned_return_datetime',
                'finished_at',
                'created_at',
            ],
        });

        application.dataValues = applicationFormatter.formatTime(application.dataValues);

        return application;
    };

    static async getApplicationsList(deviceToken) {
        const applications = await Application.findAll({
            where: {
                device_token: deviceToken,
                finished_at: null
            },
            attributes: [
                'id',
                'first_name',
                'middle_name',
                'last_name',
                'out_address',
                'out_datetime',
                'visiting_address_and_name',
                'visiting_reason',
                'planned_return_datetime',
                'finished_at',
                'created_at',
            ],
        });

        for (let i = 0; i < applications.length; i++) {
            applications[0].dataValues = applicationFormatter.formatTime(applications[0].dataValues);
        }

        return applications;
    }

    static async insertApplication() {
        const data = {};
        await Application.create(data);

        return 'success'
    }

}

module.exports = ApplicationController;
