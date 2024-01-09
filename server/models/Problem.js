const mongoose = require('mongoose');
const { Schema } = mongoose;

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
    author : {
        type: Schema.Types.ObjectId, 
        ref: 'User'
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

module.exports = mongoose.model('Problem', problemSchema);