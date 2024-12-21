const Joi = require("joi");

const paginationValidation = Joi.object({
    page : Joi.number().min(1).optional().default(1),
    limit : Joi.number().min(1).optional().default(10),
    search : Joi.string().min(1).optional().trim()
})

module.exports = paginationValidation