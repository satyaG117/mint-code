const mongoose = require('mongoose');
const {Schema} = mongoose;

const submissionSchema = new Schema({
    problem : {
        type : Schema.Types.ObjectId,
        ref : 'Problem',
        required : true
    },
    user : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    token : {
        type : String,
        required : true
    },
    status : {
        id : {
            type : Number
        },
        description : {
            type : Stirng
        }
    }

})