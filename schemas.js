const Joi = require('joi');

module.exports.bookSchema = Joi.object({
    book: Joi.object({
        name: Joi.string().required(),
        // image: Joi.string().required(),
        description: Joi.string().required()
    }).required()
})

