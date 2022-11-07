const mongoose = require("mongoose");

const dbConnection = (URL)=>{
    mongoose.connect(URL,()=>{
        console.log("Connection established with mongo database");
    })
}
module.exports = dbConnection;