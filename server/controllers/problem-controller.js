const mongoose = require('mongoose')

const HttpError = require("../models/HttpError");
const Problem = require("../models/Problem")


module.exports.addNewProblem = async (req, res, next) => {
    try {
        // check for duplicate title
        let existingProblem = await Problem.findOne({ title: req.body.title });
        if (existingProblem) {
            return next(new HttpError(409, 'Problem with this title already exists'));
        }

        req.body.time_limit = parseFloat(req.body.time_limit)
        req.body.memory_limit = parseFloat(req.body.memory_limit)
        // set it to true because the problem is not fit for public use
        req.body.private = true;

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

module.exports.getProblems = async(req,res,next)=>{
    let problems
    try{
        if(req.userData?.role == 'admin'){
            problems = await Problem.find();
        }else{
            problems = await Problem.find({private : false});
        }
        res.status(200).json(problems)
    }catch(err){
        console.log(err);
        next(new HttpError(500, 'Unable to fetch problems'));
    }
}

module.exports.getProblem = async(req,res,next)=>{
    let problem
    console.log(req.userData)
    try{
        problem = await Problem.findById(req.params.problemId);
        // only admins can see private problems
        if(problem.private && req.userData?.role != 'admin'){
            return next(new HttpError(401,'Unauthorized access requested'));
        }
        res.status(200).json(problem);
    }catch(err){
        console.log(err);
        next(new HttpError(500, 'Unable to fetch problem'));
    }
}

module.exports.updateProblem = async(req,res,next)=>{
    try{
        let targetProblem = await Problem.findById(req.params.problemId);
        console.log(targetProblem)
        if(!targetProblem){
            return next(new HttpError(404, "Problem doesn't exists"));
        }
        if(targetProblem.author.toString() !== req.userData.userId){
            return next(new HttpError(401, "Unauthorized action"))
        }

        targetProblem = await Problem.findByIdAndUpdate(req.params.problemId, req.body);

        res.status(200).json({
            message : 'Problem updated successfully'
        })
    }catch(err){
        console.log(err);
        next(new HttpError(500, 'Unknow error encountered, failed to update'));
    }
}

