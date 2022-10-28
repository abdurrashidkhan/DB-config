const express = require('express');
const productsControllers = require('../controllers/products.controllers');
const viewCounter = require('../middleware/viewCounter');
const limiter = require('../middleware/limiter')
const router = express.Router();


// router.get('/', async (req, res) => {
//    // const result = await productsCollection.find().toArray();
//    res.send('products found');
// })

// // insert data
// router.post('/', async (req, res) => {
//    // console.log(req.body);
//    // const insertData = req.body;
//    // const result = await productsCollection.insertOne(insertData);
//    res.send('data added success');
// })
/*
shortcut routing 
*/
router.route('/')
   /**
    * @api : ""
    * @apiDescription :""
    * @apiPermission : " "
    * @apiHeader : ""
    * @apiParam : ""
    * @apiParam : ""
    * @apiSuccess : ""
    * @apiError : ""
    * @apiError : ""
    */
   .get(productsControllers.findProducts)
   .post(productsControllers.postProducts)
   router.route('/:id').get(limiter,viewCounter,productsControllers.getProductsDetails)
module.exports = router;