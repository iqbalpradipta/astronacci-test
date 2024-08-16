import Joi from 'joi'

export const AuthSchema = Joi.object({
    fullName: Joi.string().min(3).max(30).required(),
    userName: Joi.string().min(3).max(30).required(),
    email: Joi.string().min(10).email().required(),
    password: Joi.string().min(6).required()
})