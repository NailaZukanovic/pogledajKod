const express = require('express');
const router = express.Router();
//for ID for mongo base
const mongoose = require('mongoose');

const Product = require('./models/products');


router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "Handling GET requests to /products"
    });
}); //not with /products bcs /products/products but with / bcs /products/ 

router.post('/', (req, res, next) => {    
    const product = new Product({
        _id : new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });

    product.save().then( result => {
        console.log(result);
    }).catch(err => console.log(err)); //Store in database

    res.status(201).json({
        message: "Handling POST requests to /products",
        createdProduct: product
    });
}); 

router.get('/:productId', (req,res,next) => {
    const id = req.params.productId;

    if(id === "special")
    {
        res.status(200).json({
            message: "You discovered the special ID",
            id: id
        })
    } else
    {
        res.status(200).json({
            message: "You passed and ID"
        })
    }
});

router.patch('/:productId', (req,res,next) => {
    res.status(200).json({
        message: "Updated product"
    })
});

router.delete('/:productId', (req,res,next) => {
    res.status(200).json({
        message: "Deleted product!"
    })
})
module.exports = router;