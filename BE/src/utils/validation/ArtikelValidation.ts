import Joi from 'joi'

export const ArtikelSchema = Joi.object({
    title: Joi.string().min(3).max(30).required(),
    content: Joi.string().min(10).required(),
    image: Joi.string().min(6)
})