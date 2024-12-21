const { ValidationError } = require("../utils/error.utils");

const validationMiddleware = (schema, type = "body") => {
    return (req, res, next) => {
        const payload = type === "body" ? req.body : req.query

        const { value, error } = schema.validate(payload)

        if (error)
            return next(new ValidationError(error?.details?.[0]?.message));

        if (type === "body") {
            req.body = value
        } else {
            req.query = value
        }
        next()
    }
}

module.exports = validationMiddleware