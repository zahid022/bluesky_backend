const Joi = require("joi")

const create = Joi.object({
    parentId: Joi.string()
        .pattern(/^[a-f\d]{24}$/i)
        .message('Id must be a valid ObjectId')
        .optional(),
    tweetId: Joi.string()
        .pattern(/^[a-f\d]{24}$/i)
        .message('Id must be a valid ObjectId')
        .required(),
    content: Joi.string().min(1).required().trim()
})

const update = Joi.object({
    content : Joi.string().min(1).optional().trim()
})

const commentValidation = {
    create,
    update
}

module.exports = commentValidation