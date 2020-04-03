module.exports = {
  get: function (statusCode, error) {
    let name;
    if (error.code === "LOGIN_FAILED") {
      name = "Error"
    } else {
      name = "ValidationError"
    }
    return ({
      error: {
        statusCode: statusCode,
        name: name,
        message: error.message,
        code: error.code
      }
    })
  },

  validationError: function (statusCode, errors, model) {
    console.log(errors);
    let codes = [],
      messages = [],
      errorCode;
    errors.map((error) => {
      let errorConcat = "";
      error.dataPath = error.dataPath.slice(1);
      console.log("error.dataPath initial", error.dataPath);
      if (!error.dataPath) {
        error.dataPath = error.params.missingProperty;
      }

      let errorKeyword = error.dataPath.split(".");
      errorKeyword.map((values) => {
        errorConcat += values + "_"
      });
      
      switch (error.keyword) {
        case "required":
          errorCode = (errorConcat + error.keyword).toUpperCase();
          break;
        case "format":
          errorCode = errorConcat.toUpperCase() + "INVALID_FORMAT";
          break;
        case "type":
          errorCode = errorConcat.toUpperCase() + "INVALID_TYPE";
          break;
        case "minLength":
        case "maxLength":
        case "maximum":
        case "minimum":
          errorCode = errorConcat.toUpperCase() + "INVALID_LENGTH";
          break;
        default:
          errorCode = error.keyword.toUpperCase();
      }
      codes.push(errorCode);
      let message = {};
      message[errorCode] = error.message;
      messages.push(message);
    });

    return ({
      error: {
        statusCode: statusCode,
        name: "ValidationError",
        message: 'Unprocessable Entity',
        details: {
          context: model,
          codes: codes,
          messages: messages
        }
      }
    })
  }
};
