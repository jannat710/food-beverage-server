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


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection

    const foodCollection=client.db("foodDB").collection("foods");
    app.post('/foods', async (req, res) => {
        const food = req.body;
        console.log(food);
        const result = await foodCollection.insertOne(food);
        res.send(result);
    });


    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
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
  
  

  
  