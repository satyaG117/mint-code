const HttpError = require('../models/HttpError')
const Language = require('../models/Language')
const LanguageSupport = require('../models/LanguageSupport');

module.exports.getSupportedLanguage = async (req, res, next) => {
    const { problemId, languageId } = req.params;
    try {
        const languageSupport = await LanguageSupport.findOne({ problem: problemId, language: languageId });
        if (!languageSupport) {
            return next(new HttpError(404, "Resource not found"));
        }

        res.status(200).json(languageSupport);
    } catch (err) {
        console.log(err);
        next(new HttpError(500, 'Unknown error encountered'));
    }
}

module.exports.getAllLanguages = async (req, res, next) => {
    try {
        const languages = await Language.find({});
        res.status(200).json(languages);
    } catch (err) {
        console.log(err);
    }
}

module.exports.editLanguageSupport = async (req, res, next) => {
    const { problemId, languageId } = req.params;
    const { imports, user_code, driver_code } = req.body;
    let languageSupport;
    try {
        // checking if the usercode and driver code are empty
        if (imports == '' && user_code == '' && driver_code == '') {
            languageSupport = await LanguageSupport.deleteOne({ problem: problemId, language: languageId });
            return res.status(200).json({
                imports: '',
                user_code: '',
                driver_code: ''
            })
        }

        // check if we already have one
        languageSupport = await LanguageSupport.findOne({ problem: problemId, language: languageId }).populate('problem');

        // if we don't have one then create
        if (!languageSupport) {
            const newLanguageSupport = new LanguageSupport({ ...req.body, problem: problemId, language: languageId });
            await newLanguageSupport.save();

            return res.status(201).json(newLanguageSupport)
        }

        // if we have one then check if the user is the author
        if (languageSupport.problem.author.toString() != req.userData.userId) {
            return next(new HttpError(401, "Unauthorized to perform this action"));
        }

        // if everything is fine then proceed with edit
        let editedLanguageSupport = await LanguageSupport.findOneAndUpdate({ problem: problemId, language: languageId }, req.body, { new: true });

        res.status(200).json(editedLanguageSupport);


    } catch (err) {
        console.log(err)
        next(new HttpError(500, 'Server error'));
    }
}

module.exports.deleteLanguageSupport = async (req, res, next) => {
    const { problemId, languageId } = req.params;
    try {
        let targetLanguageSupport = await LanguageSupport.findOne({problem : problemId, language : languageId}).populate('problem');

        if(!targetLanguageSupport){
            return next(new HttpError(404, "Not found"));
        }

        if (targetLanguageSupport.problem.author.toString() != req.userData.userId) {
            return next(new HttpError(401, "Unauthorized to perform this action"));
        }

        targetLanguageSupport = await LanguageSupport.findOneAndDelete({problem : problemId, language : languageId});

        res.status(200).json(targetLanguageSupport);
    } catch (err) {
        next(new HttpError(500, 'Server error'));
    }
}