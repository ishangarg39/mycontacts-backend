const { constants } = require("../constants")
const errorHandler = (err, req, res, next) => {

    const statusCode = res.statusCode ? res.statusCode : 500;

    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            console.log(`Status code is=${statusCode}`)
            res.json({ title: "Validation Failed", message: err.message, stackTrace: err.stack });
            break;

        case constants.NOT_FOUND:
            res.json({ title: "Not Found", message: err.message, stackTrace: err.stack });
            break;

        case constants.UNAUTHORIZED:
            res.json({ title: "Unauthorised", message: err.message, stackTrace: err.stack });
            break;

        case constants.FORBIDDEN:
            res.json({ title: "Forbidden", message: err.message, stackTrace: err.stack });
            break;

            case constants.SERVER_EROR:
            res.json({ title: "Server Error", message: err.message, stackTrace: err.stack });
            break;
        default:
            console.log(`Status code is=${statusCode}`)

            console.log("no error")
            break;
    }

};

module.exports = errorHandler;