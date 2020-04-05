
let response = {
    success: success,
    error: error,
    qrImage: qrImage,
};

function success(res, code, data){
    return res.status(code).send({
        data: data
    });
}

function error(res, code, err){
    return res.status(code).send({
        error:{
            code: code,
            message: err
        }
    });
}

function qrImage(res, code, data){
    return res.status(code).send(data);
}

module.exports = response;
