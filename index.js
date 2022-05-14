
//DB_USER=dbuser1
//DB_PASS=G6FLZxWSxDtPyRaN
//ACCESS_TOKEN=6fb9e0eedaf2fbdb3d46618f78745c2ba6bc648b051b47b2809d8ca30e6fb9eb22295e4af7c94b5393caf1a1304238bc05486bf1c3ad9844db767cb02219d69b
const express = require("express");
require('dotenv').config();
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const jwt = require('jsonwebtoken');
const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('DB connected')
})
// Replace the uri string with your MongoDB deployment's connection string.
const uri =
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.lqf9l.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
  try {
    await client.connect();
    const FoodsCollection = client.db('unLimitedFoods').collection('foods');
    app.get('/foods',async(res , req )=>{
      const query = {};
      const result = await FoodsCollection.find(query);
      res.send(result);
    })
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`localhost ${port}`) 
})
