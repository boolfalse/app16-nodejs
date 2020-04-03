'use strict';

module.exports = (sequelize, DataTypes) => {
    const Application = sequelize.define('Application', {

        qr_token: {
            type: DataTypes.STRING(256),
            defaultValue: ''
        },
        device_token: {
            type: DataTypes.STRING(256),
            defaultValue: ''
        },

        first_name: {
            type: DataTypes.STRING(50),
            defaultValue: ''
        },
        middle_name: {
            type: DataTypes.STRING(50),
            defaultValue: ''
        },
        last_name: {
            type: DataTypes.STRING(50),
            defaultValue: ''
        },

        out_address: {
            type: DataTypes.STRING(256),
            defaultValue: ''
        },
        out_datetime: {
            type: DataTypes.DATE
        },
        out_latitude: {
            type: DataTypes.STRING
        },
        out_longitude: {
            type: DataTypes.STRING
        },

        visiting_address_and_name: {
            type: DataTypes.STRING(256),
            defaultValue: ''
        },
        visiting_latitude: {
            type: DataTypes.STRING
        },
        visiting_longitude: {
            type: DataTypes.STRING
        },
        visiting_reason: {
            type: DataTypes.STRING(256),
            defaultValue: ''
        },
        planned_return_datetime: {
            type: DataTypes.DATE
        },

        finished_at: {
            type: DataTypes.DATE
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Date.now()
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Date.now()
        },
        deleted_at: {
            type: DataTypes.DATE
        },

    }, {
        tableName: 'applications',
        freezeTableName: true,
        timestamps: false
    });

    return Application;
};
