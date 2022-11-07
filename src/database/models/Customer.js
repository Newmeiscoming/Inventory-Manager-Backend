const mongoose = require("mongoose");

const customerScheme = new mongoose.Schema({
    customer_id:{type:String,required:true},
    customer_name:{type:String,require:true},
    email:{type:String,required:true},
    balance:{type:Number,required:true}
},{versionKey:false});

const Customer = new mongoose.model("customers",customerScheme);

module.exports = Customer;