const Joi = require('joi')

const {checkEmptyString , validateUsername , validatePassword, validateNumericStrings} = require('./custom-validations');

const loginSchema = Joi.object().keys({
    email : Joi.string().required().email(),
    password : Joi.string().required().custom(validatePassword , 'password-validation').min(8),
})

const signupSchema = loginSchema.keys({
    username : Joi.string().required().custom(validateUsername , 'username-validation')
})

const problemSchema = Joi.object().keys({
    private : Joi.boolean().required(),
    title : Joi.string().required().custom(checkEmptyString,'Empty string check'),
    description : Joi.string(),
    time_limit : Joi.string().custom(validateNumericStrings, 'Numeric strings check'),
    memory_limit : Joi.string().custom(validateNumericStrings, 'Numeric strings check'),
    difficulty : Joi.string().required().valid('easy','medium','hard')
})



module.exports = {loginSchema , signupSchema, problemSchema}