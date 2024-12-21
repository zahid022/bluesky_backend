const Joi = require("joi");

const likeValidation = Joi.object({
    commentId: Joi.string()
        .pattern(/^[a-f\d]{24}$/i)
        .message('Id must be a valid ObjectId')
        .optional(),
})

module.exports = likeValidation