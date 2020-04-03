'use strict';

const _isEmpty = require('lodash/isEmpty');

const {
    Application,
} = require('../models/');

class ApplicationController {

    static async getCurrentApplication(deviceToken) {
        const applications = await Application.findOne({
            where: {
                device_token: deviceToken
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

        return applications;
    };

    static async insertApplication() {
        const data = {};
        await Application.create(data);

        return 'success'
    }

}

module.exports = ApplicationController;
