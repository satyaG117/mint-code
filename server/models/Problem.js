const mongoose = require('mongoose');
const { Schema } = mongoose;

const Testcase = require('./Testcase')
const LanguageSupport = require('./LanguageSupport');
const HttpError = require('./HttpError');
const {nanoid} = require('nanoid')

const problemSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    difficulty: {
        type: String,
        required: true,
        enum: ['easy', 'medium', 'hard'],
        default: 'easy'
    },
    time_limit: {
        type: Number
    },
    memory_limit: {
        type: Number
    },
    public : {
        type : Boolean,
        required : true,
        default : false
    },
    testcaseDelimiter : {
        type : String,
        required : true,
        default : nanoid()
    },
    author : {
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required : true
    },
    createdAt: {
        type: 'Date',
        default: Date.now,
        immutable: true
    },
    lastEditedAt: {
        type: 'Date',
        default: Date.now
    }
})

problemSchema.pre('save', function(next){
    this.lastEditedAt = new Date();
    next();
})

problemSchema.pre('findOneAndDelete',async function(next){
    try{
        console.log('In pre middleware')
        console.log(this.getQuery()._id);
        const problemId = this.getQuery()._id;
        await Promise.all([
            Testcase.deleteMany({ problem: problemId }),
            LanguageSupport.deleteMany({ problem: problemId }),
        ]);
        next();
    }catch(err){
        console.log(err);
        next(new HttpError(500, "Server error"));
    }
})

module.exports = mongoose.model('Problem', problemSchema);