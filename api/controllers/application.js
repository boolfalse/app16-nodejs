'use strict';

const _isEmpty = require('lodash/isEmpty');

const {Application} = require('../models/application');

class ApplicationController {

    static async getApplications() {
        const applications = await Application.find({
            attributes: [
                'id',
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
