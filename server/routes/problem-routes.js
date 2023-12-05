const router = require('express').Router();
const {addNewProblem} = require('../controllers/problem-controller');
const { isAdmin, isLoggedIn } = require('../middlewares/auth');
const { validateInput } = require('../middlewares/validate-inputs');
const { problemSchema } = require('../utils/validation-schemas');

router.post('/',isLoggedIn, isAdmin, validateInput(problemSchema),addNewProblem);

module.exports = router;