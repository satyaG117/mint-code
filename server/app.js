require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose')

const userRoutes = require('./routes/user-routes');
const problemRoutes = require('./routes/problem-routes')
const testcaseRoutes = require('./routes/testcase-routes')
const languageRoutes = require('./routes/language-routes')

const app = express();

const PORT = process.env.PORT || 8000;
const LOCAL_MONGODB_URI = "mongodb://127.0.0.1:27017/";
const DB_NAME = "mintcode";

// middleware to accept request from any origin , change * to URL of client
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE , PUT');

    next();
})

async function main() {
    await mongoose.connect(LOCAL_MONGODB_URI + DB_NAME);
}

// call main function to connnect to mongodb
main()
    .then(data => console.log("Connected to DB"))
    .catch(err => console.log(err));

app.use(express.json());

// delay middleware for testing
app.use((req, res, next) => {
    setTimeout(() => {
        next();
    }, 1000); 
})

app.use('/api/users', userRoutes);
app.use('/api/problems',problemRoutes);
app.use('/api/testcases',testcaseRoutes)
app.use('/api/languages',languageRoutes)


app.use((err, req, res, next) => {
    if (req.headersSent) {
        return next(err);
    }

    res.status(err.code || 500).json({
        message: err.message || 'An internal error occured'
    })
})

app.listen(PORT, () => {
    console.log("Server running on PORT :", PORT);
})