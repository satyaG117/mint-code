const router = require('express').Router();

const {setUserRole} = require('../middlewares/auth')
const {signupSchema , loginSchema} = require('../utils/validation-schemas')
const {validateInput} = require('../middlewares/validate-inputs')
const {signupUser, loginUser} = require('../controllers/user-controller')

router.post('/signup',validateInput(signupSchema),signupUser);
router.post('/login',validateInput(loginSchema),setUserRole('user'), loginUser);
router.post('/admin-login',validateInput(loginSchema),setUserRole('admin'), loginUser);

module.exports = router