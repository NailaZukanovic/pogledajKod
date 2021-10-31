const express = require('express');
const router = express.Router();
//for ID for mongo base
const mongoose = require('mongoose');

const Product = require('./models/products');


router.get('/', (req, res, next) => {
    
    Product.find()
        .exec()
        .then(docs => {
            const response = {
                count: docs.length
            }
            console.log(docs);
                //   if (docs.length >= 0) {
            res.status(200).json(docs);
                // } else {
                //     res.status(404).json({
                //         message: "No entries found"
                //     });
                // }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });

}); //not with /products bcs /products/products but with / bcs /products/ 

router.post('/', (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });

    product
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Handling POST requests to /products",
                createdProduct: product
            });

        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        }); //Store in database

});

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
        .exec()
        .then(doc => {
            if (doc) {
                console.log(doc);
                res.status(200).json(doc);
            }
            else {
                res.status(404).json({ message: "No valid entry found for provided ID" });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

router.patch('/:productId', (req, res, next) => {
    const id = req.params.productId;
    const updateOps = {};
    for(const ops of req.body)
    {
        updateOps[ops.propName] = ops.value;
    }
    Product.update({_id: id}, {$set: updateOps})
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
});

router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.remove({_id: id})
        .exec()
        .then(result => 
            {
                console.log(result);

                // if(docs.length >= 0)
                // {
                    res.status(200).json(result);
                // } else {
                //     res.status(404).json({
                //         message: "No entries found"
                //     });
                // }
            })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error : err
            });
        });
})
module.exports = router;