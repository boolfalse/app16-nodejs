'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('applications', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            device_token: {
                allowNull: false,
                type: Sequelize.STRING(256),
                defaultValue: ''
            },
            first_name: {
                allowNull: false,
                type: Sequelize.STRING(50),
                defaultValue: ''
            },
            middle_name: {
                allowNull: false,
                type: Sequelize.STRING(50),
                defaultValue: ''
            },
            last_name: {
                allowNull: false,
                type: Sequelize.STRING(50),
                defaultValue: ''
            },
            out_address: {
                allowNull: false,
                type: Sequelize.STRING(256)
            },
            out_datetime: {
                allowNull: false,
                type: Sequelize.DATE
            },
            out_latitude: {
                allowNull: true,
                type: Sequelize.DECIMAL(9,6)
            },
            out_longitude: {
                allowNull: true,
                type: Sequelize.DECIMAL(9,6)
            },
            visiting_address_and_name: {
                allowNull: false,
                type: Sequelize.STRING(256)
            },
            visiting_latitude: {
                allowNull: true,
                type: Sequelize.DECIMAL(9,6)
            },
            visiting_longitude: {
                allowNull: true,
                type: Sequelize.DECIMAL(9,6)
            },
            visiting_reason: {
                allowNull: false,
                type: Sequelize.STRING(256)
            },
            planned_return_datetime: {
                allowNull: false,
                type: Sequelize.DATE
            },
            finished_at: {
                allowNull: true,
                type: Sequelize.DATE
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE,
                // defaultValue: Date.now()
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE,
                // defaultValue: Date.now()
            },
            deleted_at: {
                allowNull: true,
                type: Sequelize.DATE,
                defaultValue: null
            },
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('applications');
    }
};
