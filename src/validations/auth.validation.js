const Joi = require("joi")

const login = Joi.object({
    username: Joi.string().min(3).required().trim(),
    password: Joi.string().min(8).required().trim()
})

const register = Joi.object({
    email: Joi.string().email().required(),
    username: Joi.string().min(3).required().trim(),
    password: Joi.string().min(8).required().trim()
})

const update = Joi.object({
    email: Joi.string().email().optional(),
    username: Joi.string().min(3).optional().trim(),
    avatar: Joi.string()
        .pattern(/^[a-f\d]{24}$/i)
        .message('Avatar must be a valid ObjectId')
        .optional(),
    background: Joi.string()
        .pattern(/^[a-f\d]{24}$/i)
        .message('Avatar must be a valid ObjectId')
        .optional(),
    role: Joi.string().trim().valid("public", "private").optional()
})


const authValidation = {
    login,
    register,
    update
}

module.exports = authValidation