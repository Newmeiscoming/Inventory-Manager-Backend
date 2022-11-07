const Customer = require("../database/models/Customer");
const Order = require("../database/models/Orders");
const Product = require("../database/models/Product");

const router = require("express").Router();

router.get("/inventory",async (req,res)=>{
    try {
        const inventory = await Product.find();

    res.status(200).json(inventory);
    } catch (error) {
        res.status(400).json({
            status:"Failed",
            message:error.message
        })
    }
    
})

router.get("/orders/:orderID",async (req,res)=>{
    try {
        const {orderID} = req.params;
        const orderData = await Order.find({_id:orderID});
        if(!orderData){
            res.status(200).json({
                status:"Failure",
                message:"Order not found"
            })
            return;
        }

        res.status(200).json({
            status:"Sucess",
            order:orderData
        })
    } catch (error) {
        res.status(400).json({
            status:"Failure",
            message:error.message
        })
    }
})

router.get("/product/:productID",async (req,res)=>{
    try {
        const {productID} = req.params;
        const productData = await Product.find({_id:productID});
        if(!productData){
            res.status(200).json({
                status:"Failure",
                message:"Product not found"
            })
            return;
        }

        res.status(200).json({
            status:"Sucess",
            product:productData
        })
    } catch (error) {
        res.status(400).json({
            status:"Failure",
            message:error.message
        })
    }
})
router.get("/customer/:customerID",async (req,res)=>{
    try {
        const {customerID} = req.params;
        const customerData = await Customer.find({_id:customerID});
        if(!customerData){
            res.status(200).json({
                status:"Failure",
                message:"Customer not found"
            })
            return;
        }

        res.status(200).json({
            status:"Sucess",
            customer:customerData
        })
    } catch (error) {
        res.status(400).json({
            status:"Failure",
            message:error.message
        })
    }
})

router.get("/inventory/:productType",async (req,res)=>{
    try {
         
        const {productType} = req.params;
        const products = await Product.find ({product_type:productType});
        if(!products){
            res.status(200).json({
                status:"Failure",
                message:"No products in this category"
            })
            return;
        }

        res.status(200).json({
            status:"Sucess",
            products:products
        })
    } catch (error) {
        
        res.status(400).json({
            status:"Failure",
            message:error.message
        })
        
    }
})

module.exports = router;