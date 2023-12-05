const HttpError = require("../models/HttpError");
const Problem = require("../models/Problem")

module.exports.addNewProblem = async (req, res, next) => {
    try {
        // check for duplicate title
        let existingProblem = await Problem.findOne({ title: req.title });
        if (existingProblem) {
            return next(new HttpError(409, 'Problem with this title already exists'));
        }

        req.body.time_limit = parseFloat(req.body.time_limit)
        req.body.memory_limit = parseFloat(req.body.memory_limit)

        let newProblem = new Problem({ ...req.body, author : req.userData.userId});

        await newProblem.save();

        res.status(201).json({
            status : 'success',
            problemId : newProblem._id
        })
    } catch (err) {
        console.log(err);
        next(new HttpError(500, 'Unknow error occured while trying to add problem'));
    }
}