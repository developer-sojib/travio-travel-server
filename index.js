const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;


const port = project.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wcyf6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;


// const uri = "mongodb+srv://courses:9bkww44I4jcIIDgH@cluster0.l2jwh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });



app.get("/", (req, res) => {
  res.send("Coming soon.....Developer is working on it. Stay connected. For getting");
});

async function run() {
  try {
    await client.connect();
    const database = client.db("tourhotel");
    const coursesCollection = database.collection("booking");
    const orderCollection = database.collection("orders");

    // load courses get api fir react
    app.get("/booking", async (req, res) => {
      const size = parseInt(req.query.size);
      const page = req.query.page;
      const cursor = coursesCollection.find({});
      const count = await cursor.count();
      let courses;

      if (size && page) {
        courses = await cursor
          .skip(size * page)
          .limit(size)
          .toArray();
      } else {
        courses = await cursor.toArray();
      }
      res.json({ count, courses });
    });

    // load single course get api
    app.get("/booking/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const course = await coursesCollection.findOne(query);
      res.json(course);
    });

    // load cart data according to user id get api
    app.get("/cart/:uid", async (req, res) => {
      const uid = req.params.uid;
      const query = { uid: uid };
      const result = await orderCollection.find(query).toArray();
      res.json(result);
    });

    // add data to cart collection with additional info
    app.post("/booking/add", async (req, res) => {
      const course = req.body;
      const result = await orderCollection.insertOne(course);
      res.json(result);
    });

    // delete data from cart delete api
    app.delete("/delete/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await orderCollection.deleteOne(query);
      res.json(result);
    });

    // purchase delete api
    app.delete("/purchase/:uid", async (req, res) => {
      const uid = req.params.uid;
      const query = { uid: uid };
      const result = await orderCollection.deleteMany(query);
      res.json(result);
    });

    // orders get api
    app.get("/orders", async (req, res) => {
      const result = await orderCollection.find({}).toArray();
      res.json(result);
    });

  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log("server is running on port", port);
});