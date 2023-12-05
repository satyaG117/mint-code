const mongoose = require('mongoose');
const Language = require('../models/Language');

const LOCAL_MONGODB_URI = "mongodb://127.0.0.1:27017/";
const DB_NAME = "mintcode";

const insertLanguages = async () => {
    try {
        await mongoose.connect(LOCAL_MONGODB_URI + DB_NAME);
        const langs = [
            { id: 49, name: 'C (GCC 8.3.0)' },
            { id: 53, name: 'C++ (GCC 8.3.0)' },
            { id: 50, name: 'C (GCC 9.2.0)' },
            { id: 54, name: 'C++ (GCC 9.2.0)' },
            { id: 95, name: 'Go (1.18.5)' },
            { id: 91, name: 'Java (JDK 17.0.6)' },
            { id: 62, name: 'Java (OpenJDK 13.0.1)' },
            { id: 63, name: 'JavaScript (Node.js 12.14.0)' },
            { id: 93, name: 'JavaScript (Node.js 18.15.0)' },
            { id: 78, name: 'Kotlin (1.3.70)' },
            { id: 70, name: 'Python (2.7.17)' },
            { id: 71, name: 'Python (3.8.1)' },
            { id: 82, name: 'SQL (SQLite 3.27.2)' },
            { id: 94, name: 'TypeScript (5.0.3)' },
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