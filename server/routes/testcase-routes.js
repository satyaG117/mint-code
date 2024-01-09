const router = require('express').Router();

const {addNewTestcase, updateTestcase, deleteTestcase} = require('../controllers/testcase-controller');
const { isLoggedIn, isAdmin } = require('../middlewares/auth');
const { validateInput } = require('../middlewares/validate-inputs');
const {testcaseSchema} = require('../utils/validation-schemas')

router.post('/problem/:problemId',isLoggedIn,isAdmin, validateInput(testcaseSchema), addNewTestcase);

router.put('/:testcaseId',isLoggedIn, isAdmin, validateInput(testcaseSchema), updateTestcase)

router.delete('/:testcaseId',isLoggedIn, isAdmin, deleteTestcase)

module.exports = router;