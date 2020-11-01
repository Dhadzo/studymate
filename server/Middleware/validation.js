const Joi = require('@hapi/joi')
const bcrypt = require('bcryptjs')


const signupValidation =  (data) => {
    const schema = Joi.object({
        name: Joi.string().required().min(6),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
        username: Joi.string().required().min(6)
    })
    return schema.validate(data)
}
const signinValidation =  (data) => {
    const schema = Joi.object({
        emailOrUsername: Joi.string().required().min(6),
        password: Joi.string().required().min(6)
    })
    return schema.validate(data)
}
const encryptPassword =  async (password) => {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword =  await bcrypt.hash(password, salt)
    return hashedPassword
}

module.exports = {signinValidation,signupValidation,encryptPassword}