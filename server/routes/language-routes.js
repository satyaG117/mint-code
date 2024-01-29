const router = require('express').Router();
const {getAllLanguages, getSupportedLanguage, editLanguageSupport, deleteLanguageSupport,getSupportedLanguagesByProblemId} = require('../controllers/language-controller');
const { isLoggedIn, isAdmin } = require('../middlewares/auth');
const { validateInput } = require('../middlewares/validate-inputs');
const { languageSupportSchema } = require('../utils/validation-schemas');

router.get('/', getAllLanguages);

router.get('/problem/:problemId',getSupportedLanguagesByProblemId)

router.get('/problem/:problemId/language/:languageId', getSupportedLanguage);

router.put('/problem/:problemId/language/:languageId',isLoggedIn, isAdmin, validateInput(languageSupportSchema),editLanguageSupport);

router.delete('/problem/:problemId/language/:languageId', isLoggedIn, isAdmin,deleteLanguageSupport);

module.exports = router;