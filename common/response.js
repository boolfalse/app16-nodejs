let response = {
    success: success,
    error: error
};

function success(res, code, data){
    return res.status(code).send({
        success: true,
        payload: data
    });
}

function error(res, code, err){
    return res.status(code).send({
        success: false,
        error:{
            code: code,
            message :err
        }
    });
}

module.exports = response;