const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express')
const app = express()
const cors = require("cors");
const port = 3000

// PFm3B9l6YJ3Znhgn
// task_manage

// Middleware
app.use(cors());
app.use(express.json());


const uri = "mongodb+srv://task_manage:PFm3B9l6YJ3Znhgn@cluster0.y5jebou.mongodb.net/?retryWrites=true&w=majority";

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

    const tasksCollection = client.db("task_manage").collection("tasks");

    app.post("/api/v1/task", async (req, res) => {
      const task = req.body;
      console.log(task);
      const result = await tasksCollection.insertOne(task);
      res.send(result);
    });

    app.get("/api/v1/tasks", async(req, res) => {
      const result = await tasksCollection.find().toArray();
      res.send(result);
    });

  } finally {
  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})