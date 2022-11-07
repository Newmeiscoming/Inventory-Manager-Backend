const Customer = require("../database/models/Customer");

const router = require("express").Router();

router.put("/addBalance/:customer_id",async (req,res)=>{
    try {
        const {amount} = req.body;
        const {customer_id} = req.params;
        const customer = await Customer.findOne({customer_id});
        const addBalance = await Customer.findOneAndUpdate({customer_id},{balance:customer.balance+amount});
        res.status(201).json({
            status:"Success",
            message:"Amount added succesfully to you account"
        });
        
    } catch (error) {
        res.status(401).json({
            status:"Failure",
            message:error.message
        })
    }
})

module.exports = router;