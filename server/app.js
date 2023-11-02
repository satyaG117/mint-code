const express = require('express');

const app = express();

const PORT = 8000;

// app.get('/test',(req,res)=>{
//     res.status(200).json({"message" : "Response from server"});
// })

app.listen(PORT , ()=>{
    console.log("Server running on PORT : ",PORT);
})