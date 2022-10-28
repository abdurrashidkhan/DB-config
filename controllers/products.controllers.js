const { ObjectId } = require("mongodb");
const errorHandler = require("../middleware/errorHandelar")
const { getDb } = require("../utils/dbConnect")

const products = [
   { id: 1, name: 'iphone' },
   { id: 2, name: 'samsung' },
   { id: 3, name: 'oppo ' },
   { id: 4, name: 'vivo' },
   { id: 5, name: 'wallton' }
]
// module.exports.getProducts = async (req, res) => {

//    res.json(products)
// }
// for products post 
module.exports.postProducts = async (req, res, next) => {
   try {
      const db = getDb();
      const tool = req.body;
      const result = await db.collection('products').insertOne(tool)
      if (!result.insertedId) {
         res.status(400).send({ status: false, error: 'something went wrong' })
      }
      if (result.insertedId) {
         res.status(200).send({ status: true, message: 'Data Inserted successful' })
      }
   } catch (error) {
      next(error);
   }
}
// find products with pagination
module.exports.findProducts = async (req, res, next) => {
   try {
      const db = getDb();
      const { page, limit } = req.query;
      const data = await db.collection('products').find().skip(+page * limit).limit(+limit).toArray();
      res.status(200).send({ status: true, success: true, message: 'Data Find Success', data: data })
   } catch (error) {
      next(error);
   }
}
// for One products Details
module.exports.getProductsDetails = async (req, res, next) => {
   try {
      const db = getDb();
      const { id } = req.params;
      const data = await db.collection('products').findOne({ _id: ObjectId(id) });
      res.status(200).send({ status: true, message: 'product Details Found', data: data })
   } catch (error) {
      next(error);
      // console.log(error.message);
   }
}