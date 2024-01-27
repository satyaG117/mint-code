const mongoose = require('mongoose');
const Language = require('../models/Language');

const LOCAL_MONGODB_URI = "mongodb://127.0.0.1:27017/";
const DB_NAME = "mintcode";

const insertLanguages = async () => {
    try {
        await mongoose.connect(LOCAL_MONGODB_URI + DB_NAME);
        const langs = [
            { id: 50, name: 'C (GCC 9.2.0)' ,editor_code : 'c'},
            { id: 54, name: 'C++ (GCC 9.2.0)' ,editor_code : 'cpp'},
            { id: 95, name: 'Go (1.18.5)' ,editor_code : 'go'},
            { id: 91, name: 'Java (JDK 17.0.6)' ,editor_code : 'java'},
            { id: 93, name: 'JavaScript (Node.js 18.15.0)' ,editor_code : 'javascript'},
            { id: 71, name: 'Python (3.8.1)' ,editor_code : 'python'},
            { id: 94, name: 'TypeScript (5.0.3)' ,editor_code : 'typescript'},
        ]

        await Language.insertMany(langs);
        console.log("Languages inserted successfully")
    } catch (err) {
        console.log(err);
    } finally {
        await mongoose.disconnect();
    }
}

insertLanguages();