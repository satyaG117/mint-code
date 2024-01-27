const mongoose = require('mongoose');
const { Schema } = mongoose;

const languageSupportSchema = new Schema({
    imports : {
        type : String,
    },
    user_code: {
        type : String,
        required : true
    },
    driver_code : {
        type : String,
        required : true
    },
    problem : {
        type : Schema.Types.ObjectId,
        ref : 'Problem'
    },
    language : {
        type : Schema.Types.ObjectId,
        ref : 'Language'
    }
})

module.exports = mongoose.model('LanguageSupport', languageSupportSchema);