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
    time_limit : Joi.number().required().min(0.1),
    memory_limit : Joi.number().required().min(2048),
    difficulty : Joi.string().required().valid('easy','medium','hard')
})

const testcaseSchema = Joi.object().keys({
    public : Joi.boolean(),
    input : Joi.string().required(),
    expected_output : Joi.string().required()
})

const languageSupportSchema = Joi.object().keys({
    imports: Joi.string().allow(''),
    user_code : Joi.string().required(),
    driver_code : Joi.string().required()
})


module.exports = {loginSchema , signupSchema, problemSchema, testcaseSchema, languageSupportSchema}