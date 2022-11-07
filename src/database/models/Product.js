const mongoose = require("mongoose");

const productScheme = new mongoose.Schema({
    product_id:{type:String,required:true},
    product_type:{type:String,require:true},
    product_name:{type:String,required:true},
    product_price:{type:Number,required:true},
    available_quantity:{type:Number,required:true}
},{versionKey:false});

const Product = new mongoose.model("product",productScheme);

module.exports = Product;