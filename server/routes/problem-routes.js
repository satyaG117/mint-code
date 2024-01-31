const router = require('express').Router();
const {addNewProblem, getProblems, getProblem, updateProblem,deleteProblemById} = require('../controllers/problem-controller');
const { isAdmin, isLoggedIn, getUserRole } = require('../middlewares/auth');
const { validateInput } = require('../middlewares/validate-inputs');
const { problemSchema } = require('../utils/validation-schemas');

router.post('/',isLoggedIn, isAdmin, validateInput(problemSchema),addNewProblem);

router.get('/',getUserRole, getProblems);

router.get('/:problemId', getUserRole, getProblem)

router.put('/:problemId',isLoggedIn, isAdmin, validateInput(problemSchema),updateProblem)

router.delete('/:problemId', isLoggedIn, isAdmin, deleteProblemById)

module.exports = router;