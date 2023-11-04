const Joi = require('joi')

const {checkEmptyString , validateUsername , validatePassword} = require('./custom-validations');

const loginSchema = Joi.object().keys({
    email : Joi.string().required().email(),
    password : Joi.string().required().custom(validatePassword , 'password-validation').min(8),
})

const signupSchema = loginSchema.keys({
    username : Joi.string().required().custom(validateUsername , 'username-validation')
})

module.exports = {loginSchema , signupSchema}