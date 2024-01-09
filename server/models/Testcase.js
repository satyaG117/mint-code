const mongoose = require('mongoose');
const { Schema } = mongoose;

const testcaseSchema = new Schema({
    public : {
        type : Boolean,
        required : true,
        default : false
    },
    input: {
        type: String
    },
    expected_output: {
        type: String,
        required: true
    },
    problem : {
        type : Schema.Types.ObjectId,
        ref : 'Problem'
    }
})

module.exports = mongoose.model('Testcase', testcaseSchema)