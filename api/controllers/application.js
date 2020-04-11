'use strict';

const applicationFormatter = require('../../api/helpers/applicationFormatter');
const _isEmpty = require('lodash/isEmpty');

const {
    Application,
} = require('../models/');

class ApplicationController {

    static applicationAttributes = [
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
    ];

    // Do not change the retrieved attributes (these attributes are used for generating the QR code)
    static async getApplication(deviceToken) {
        const application = await Application.findOne({
            where: {
                device_token: deviceToken
            },
            attributes: [
                // 'id',
                // 'device_token',
                'first_name',
                'middle_name',
                'last_name',
                'out_datetime',
                'out_address',
                'visiting_address_and_name',
                'visiting_reason',
                'planned_return_datetime',
                // 'finished_at',
                // 'created_at',
            ],
        });

        return application;
    };

    static generateQRInputString(applicationDataValues) {
        const formattedApplication = applicationFormatter.formatTime(applicationDataValues, false, false);
        const qrInputString = "\n" +
            formattedApplication.first_name + " " + formattedApplication.middle_name + " " + formattedApplication.last_name + "\n" +
            "---\n" +
            formattedApplication.out_datetime + "\n" +
            formattedApplication.out_address + "\n" +
            formattedApplication.visiting_address_and_name + "\n" +
            formattedApplication.visiting_reason + "\n" +
            formattedApplication.planned_return_datetime + "\n";

        return qrInputString;
    }

    static async validateCurrentApplication(data) {
        if (_isEmpty(data)) {
            return "Տվյալները չեն գտնվել";
        }

        if (data.device_token) {
            return false;
        } else {
            return "Տվյալները չեն գտնվել";
        }
    }
    static async currentApplication(deviceToken) {
        const application = await Application.findOne({
            where: {
                device_token: deviceToken,
                finished_at: null
            },
            attributes: this.applicationAttributes,
        });

        if (application) {
            application.dataValues = applicationFormatter.formatTime(application.dataValues, false, false);
        } else {
            return {
                error: true,
                message: "Տվյալները չեն գտնվել",
            };
        }

        return {
            output: application
        };
    };

    static async getApplicationsList(deviceToken) {
        const applications = await Application.findAll({
            where: {
                device_token: deviceToken,
                finished_at: null
            },
            attributes: this.applicationAttributes,
        });

        for (let i = 0; i < applications.length; i++) {
            applications[0].dataValues = applicationFormatter.formatTime(applications[0].dataValues, false, false);
        }

        return applications;
    }

    static async createApplication(data) {
        const application = await Application.create(data);

        // console.log(data);

        return application;
    }

    static async finishApplication(deviceToken) {
        const application = await Application.findOne({
            where: {
                device_token: deviceToken,
                // finished_at: null
            },
            attributes: this.applicationAttributes,
        });

        if (application) {
            const finishDate = new Date();
            await application.update({
                finished_at: finishDate,
                updated_at: finishDate
            });

            application.dataValues = applicationFormatter.formatTime(application.dataValues, true, false);
            delete application.dataValues.updated_at;

            return application;
        } else {
            return false;
        }
    }

    static async deleteApplicationByDeviceToken(deviceToken) {
        await Application.destroy({
            where: {
                device_token: deviceToken
            }
        });

        return true;
    }

    static async deleteApplicationById(deviceToken) {
        await Application.destroy({
            where: {
                device_token: deviceToken
            }
        });

        return true;
    }
}

module.exports = ApplicationController;
