const mongoose = require("mongoose");

const orderScheme = new mongoose.Schema({
    customer_id:{type:String,required:true},
    product_id:{type:String,require:true},
    product_name:{type:String,required:true},
    quantity:{type:Number,required:true}
},{versionKey:false});

const Order = new mongoose.model("orders",orderScheme);

module.exports = Order;