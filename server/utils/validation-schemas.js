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
    public : Joi.boolean().required(),
    title : Joi.string().required().custom(checkEmptyString,'Empty string check'),
    description : Joi.string(),
    time_limit : Joi.string().custom(validateNumericStrings, 'Numeric strings check'),
    memory_limit : Joi.string().custom(validateNumericStrings, 'Numeric strings check'),
    difficulty : Joi.string().required().valid('easy','medium','hard')
})

const testcaseSchema = Joi.object().keys({
    public : Joi.boolean(),
    input : Joi.string().required(),
    expected_output : Joi.string().required()
})



module.exports = {loginSchema , signupSchema, problemSchema, testcaseSchema}