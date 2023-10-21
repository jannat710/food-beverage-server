const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();

//middleware
app.use(cors());
app.use(express.json());

//port
const port = process.env.PORT || 5000;



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pvt8fts.mongodb.net/?retryWrites=true&w=majority`;



const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {

    await client.connect();


    const foodCollection=client.db("foodDB").collection("foods");
    app.post('/foods', async (req, res) => {
        const food = req.body;
        console.log(food);
        const result = await foodCollection.insertOne(food);
        res.send(result);
    });

    app.get('/foods', async (req, res) => {
        const result =await foodCollection.find().toArray();
        res.send(result);
    })
    app.put('/foods/:id', async(req, res) => {
        const id = req.params.id;
            const query = {_id: new ObjectId(id)}
            const result = await foodCollection.findOne(query);
            res.send(result);
    }) 


    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {

  }
}
run().catch(console.dir);


//Defining a Route
app.get("/", (req, res) => {
    res.send("Food and beverage server are running...");
  });

//Starting the Server
app.listen(port, () => {
    console.log(`Food and beverage server are Running on port ${port}`);
  });
  
  

  
  