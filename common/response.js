
let response = {
    success: success,
    error: error,
    errorWithFields: errorWithFields
};

function success(res, code, data) {
    return res.status(code).send({
        data: data
    });
}

function error(res, code, err) {
    return res.status(code).send({
        error:{
            code: code,
            message: err
        }
    });
}

function errorWithFields(res, code, err, fields) {
    return res.status(code).send({
        error:{
            code: code,
            message: err,
            fields: fields
        }
    });
}

module.exports = response;
