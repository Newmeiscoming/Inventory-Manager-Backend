const router = require("express").Router();
const Order = require("../database/models/Orders");
const Customer = require("../database/models/Customer");
const Product = require("../database/models/Product");



router.post("/orders",async (req,res)=>{
    try {
        const {customer_id,product_id,product_name,quantity} = req.body;
        const productData = await Product.findOne({product_id});
        const customerData = await Customer.findOne({customer_id});
        
        if(productData.available_quantity<quantity){
            res.status(200).json({
                status:"Failure",
                message:"This product is out of stock"
            });
            return;
        }
        else if(productData.product_price*quantity>customerData.balance){
            res.status(200).json({
                status:"Failure",
                message:"Insufficient balance"
            })
            return;
        }
        const newOrder = await Order.create({
            customer_id,
            product_id,
            product_name,
            quantity
        });
        
        const updatedInventory = await Product.findOneAndUpdate({product_id},{available_quantity:productData.available_quantity-quantity});
        const updatedBalance = await Customer.findOneAndUpdate({customer_id},{balance:customerData.balance-(productData.product_price*quantity)});


        res.status(201).json({
            status:"Success",
            message:"Order created successfully"
        });
        
    } catch (error) {
        res.status(400).json({
            status:"Failure",
            message:error.message
        })
        console.log(error.message);   
    }
    
})

router.post("/product",async (req,res)=>{
    try {
        const {product_id,product_type,product_name,product_price,available_quantity} = req.body;
        const newProduct = await Product.create({
            product_id,
            product_name,
            product_price,
            product_type,
            available_quantity
        });

        console.log(newProduct);
        res.status(201).json({
            status:"Success",
            message:"Product added succefully",
            product:newProduct
        });
    } catch (error) {
        console.log(error.message);
        res.status(401).json({
            status:"Failure",
            message:error.message
        })
    }
})

router.post("/customer",async (req,res)=>{
    try {
        const {customer_id,customer_name,email,balance} = req.body;
        const newCustomer = await Customer.create({
            customer_id,
            customer_name,
            email,
            balance
        });

        console.log(newCustomer);
        res.status(201).json({
            status:"Success",
            message:"Customer added succefully",
            customer:newCustomer
        });
    } catch (error) {
        console.log(error.message);
        res.status(401).json({
            status:"Failure",
            message:error.message
        })
    }
})

module.exports = router;