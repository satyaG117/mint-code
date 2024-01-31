const mongoose = require('mongoose')

const HttpError = require("../models/HttpError");
const Problem = require("../models/Problem")
// const Testcase = require('../models/Testcase')


module.exports.addNewProblem = async (req, res, next) => {
    try {
        // check for duplicate title
        let existingProblem = await Problem.findOne({ title: req.body.title });
        if (existingProblem) {
            return next(new HttpError(409, 'Problem with this title already exists'));
        }

        req.body.time_limit = parseFloat(req.body.time_limit)
        req.body.memory_limit = parseFloat(req.body.memory_limit)
        // set to private
        req.body.public = false;

        let newProblem = new Problem({ ...req.body, author: new mongoose.Types.ObjectId(req.userData.userId) });

        await newProblem.save();

        res.status(201).json({
            status: 'success',
            problemId: newProblem._id
        })
    } catch (err) {
        console.log(err);
        next(new HttpError(500, 'Unknow error occured while trying to add problem'));
    }
}

module.exports.getProblems = async (req, res, next) => {
    let problems
    try {
        if (req.userData?.role == 'admin') {
            problems = await Problem.find();
        } else {
            problems = await Problem.find({ private: false });
        }
        res.status(200).json(problems)
    } catch (err) {
        console.log(err);
        next(new HttpError(500, 'Unable to fetch problems'));
    }
}

module.exports.getProblem = async (req, res, next) => {
    let problem
    const { includeTestcases } = req.query;
    // const problemId = new mongoose.Types.ObjectId(req.params.problemId)
    try {
        // if we have to include testcases
        if (includeTestcases === 'true') {
            // if user is a admin then send everything
            if (req.userData?.role == 'admin') {
                problem = await Problem.aggregate([
                    {
                        $match: {
                            _id: new mongoose.Types.ObjectId(req.params.problemId),
                        }
                    },
                    {
                        $lookup:
                        {
                            from: "testcases",
                            localField: "_id",
                            foreignField: "problem",
                            as: "testcases",
                        },
                    }
                ])
            } else { // just send the public testcases
                problem = await Problem.aggregate([
                    {
                        $match: {
                            _id: new mongoose.Types.ObjectId(req.params.problemId),
                        }
                    },
                    {
                        $lookup:
                        {
                            from: "testcases",
                            localField: "_id",
                            foreignField: "problem",
                            as: "testcases",
                        }
                    },
                    {
                        $addFields:
                        {
                            testcases: {
                                $filter: {
                                    input: "$testcases",
                                    as: "testcase",
                                    cond: {
                                        $eq: ["$$testcase.public", true],
                                    },
                                },
                            },
                        }
                    },

                ])
            }
        } else { // if no testcases are needed
            console.log(req.params.problemId)
            problem = await Problem.aggregate([
                {
                    $match: {
                        _id: new mongoose.Types.ObjectId(req.params.problemId)
                    },
                }
            ])
        }

        console.log(problem)

        // nothing found
        if (problem.length == 0) {
            return next(new HttpError(404, 'Problem not found'));
        }

        // if the problem is private and the user is not admin then unauthorized
        if (problem[0]?.public === false && req.userData?.role != 'admin') {
            return next(new HttpError(401, 'Not authorized to access this problem'))
        }

        res.status(200).json(problem[0]);
    } catch (err) {
        console.log(err);
        next(new HttpError(500, 'Unable to fetch problem'));
    }
}

module.exports.updateProblem = async (req, res, next) => {
    try {
        let targetProblem = await Problem.findById(req.params.problemId);
        console.log(targetProblem)
        if (!targetProblem) {
            return next(new HttpError(404, "Problem doesn't exists"));
        }
        if (targetProblem.author.toString() !== req.userData.userId) {
            return next(new HttpError(401, "Unauthorized action"))
        }

        targetProblem = await Problem.findByIdAndUpdate(req.params.problemId, req.body);

        res.status(200).json({
            message: 'Problem updated successfully'
        })
    } catch (err) {
        next(new HttpError(500, 'Unknow error encountered, failed to update'));
    }
}

module.exports.deleteProblemById = async(req,res, next)=>{
    try{
        const problem = await Problem.findById(req.params.problemId);
        if(!problem){
            return next(new HttpError(404, "Problem not found"));
        }

        if(problem.author.toString() != req.userData.userId){
            return next(new HttpError(401, "Unauthorized to perform this action"));
        }

        // proceed with deletetion
        const targetProblem = await Problem.findByIdAndDelete(req.params.problemId);

        res.status(200).json(targetProblem);
    }catch(err){
        console.log(err);
        next(new HttpError(500, "Server error"))
    }
}
