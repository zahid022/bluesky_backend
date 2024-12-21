const Joi = require("joi")

const create = Joi.object({
    title : Joi.string().trim().min(3).required(),
    media: Joi.string()
        .pattern(/^[a-f\d]{24}$/i)
        .message('media must be a valid ObjectId')
        .optional()
})

const update = Joi.object({
    title : Joi.string().trim().min(3).optional(),
    media: Joi.string()
        .pattern(/^[a-f\d]{24}$/i)
        .message('media must be a valid ObjectId')
        .optional()
})

const tweetValidation = {
    create,
    update
}

module.exports = tweetValidation