const mongoose = require('mongoose');
const { Schema } = mongoose;

const languageSchema = new Schema({
    id: {
        type : Number,
        required : true,
        unique : true
    },
    name : {
        type : String,
        required : true
    },
    editor_code : {
        type : String,
        required : true
    }
})

module.exports = mongoose.model('Language', languageSchema);