const router = require('express').Router();

const {signupSchema , loginSchema} = require('../utils/validation-schemas')
const {validateInput} = require('../middlewares/validate-inputs')
const {signupUser, loginUser} = require('../controllers/user-controller')

router.post('/signup',validateInput(signupSchema),signupUser);

router.post('/login',validateInput(loginSchema), loginUser);

module.exports = router