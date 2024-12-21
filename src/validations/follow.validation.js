const Joi = require("joi")

const followRequest = Joi.object({
    followedId: Joi.string()
        .pattern(/^[a-f\d]{24}$/i)
        .message('Id must be a valid ObjectId')
        .required()
})

const accept = Joi.object({
    followingId: Joi.string()
        .pattern(/^[a-f\d]{24}$/i)
        .message('Id must be a valid ObjectId')
        .required()
})

const reject = Joi.object({
    followingId: Joi.string()
        .pattern(/^[a-f\d]{24}$/i)
        .message('Id must be a valid ObjectId')
        .optional(),
    followedId: Joi.string()
        .pattern(/^[a-f\d]{24}$/i)
        .message('Id must be a valid ObjectId')
        .optional()
})

const followValidation = {
    followRequest,
    accept,
    reject
}

module.exports = followValidation