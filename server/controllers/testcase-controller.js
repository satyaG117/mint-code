const HttpError = require('../models/HttpError');
const Problem = require('../models/Problem');
const Testcase = require('../models/Testcase')

module.exports.addNewTestcase = async (req, res, next) => {
    const { problemId } = req.params;
    try {
        const problem = await Problem.findById(problemId);

        if (!problem) {
            return next(404, "Problem not found");
        }

        if (problem.author.toString() !== req.userData.userId) {
            return next(401, "Unauthorized to perform this action");
        }

        // proceed to add new testcase
        const newTestcase = new Testcase({ ...req.body, problem: problemId });

        await newTestcase.save();

        res.status(201).json(newTestcase);
    } catch (err) {
        console.log(err);
        next(new HttpError(500, 'Server error !! Failed to add testcase'))
    }
}



module.exports.updateTestcase = async (req, res, next) => {
    const { testcaseId } = req.params;

    try {
        const targetTestcase = await Testcase.findById(testcaseId).populate('problem');

        if (!targetTestcase) {
            return next(new HttpError(404, "Testcase not found"));
        }

        // if the user isn't the author of the problem then throw error
        if (targetTestcase.problem.author.toString() != req.userData.userId) {
            return next(new HttpError(401, "Unauthorized request"));
        }

        // proceed with edit
        const editedTestcase = await Testcase.findByIdAndUpdate(testcaseId, req.body, { new: true });

        res.status(200).json(editedTestcase);

    } catch (err) {
        console.log(err);
        next(new HttpError(500, 'Server error !! Failed to edit testcase'))
    }
}



module.exports.deleteTestcase = async (req, res, next) => {
    const { testcaseId } = req.params
    try {
        let targetTestcase = await Testcase.findById(testcaseId).populate('problem', 'author');

        if (!targetTestcase) {
            return next(new HttpError(404, "Testcase not found"));
        }

        // if the user isn't the author of the problem then throw error
        if (targetTestcase.problem.author.toString() != req.userData.userId) {
            return next(new HttpError(401, "Unauthorized request"));
        }

        targetTestcase = await Testcase.findByIdAndDelete(testcaseId);

        res.status(200).json(targetTestcase);

    } catch (err) {
        console.log(err);
        next(new HttpError(500, 'Server error !! Failed to delete testcase'))
    }

}