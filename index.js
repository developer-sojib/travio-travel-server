/* const express = require("express");
const { MongoClient } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;
require("dotenv").config();
// const bodyParser = require('body-parser');
const cors = require("cors"); */
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;


/* const port = process.env.PORT || 5000;
// http://localhost:5000
const app = express();
// app.use(bodyParser.json());

app.use(cors());
app.use(express.json()); */
const port = 5000;
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




/* client.connect(err => {
  const collection = client.db("tourhotel").collection("booking");
  // perform actions on the collection object

  const tour = [
    {
      "key": 1,
      "img": "https://designexpart.com/tm/html/bahon/assets/img/package/package-1.jpg",
      "title": "Brazil – All Stunning",
      "desc": "Where does one begin with Italy? Italy is the land of mouthwatering meals that last all night.",
      "descL": "Where does one begin with BRAZIL? BRAZIL is the land of mouthwatering meals that last all night, heady wines to drink underneath olive trees, pastel villas built into sheer cliffs above the crystal blue Tyrrhenian Sea, and Renaissance paintings and marble sculptures that leave you awestruck and inspired. It is everyone’s dream to travel to Italy, and for good reason. Whether you are heading to the beach or to the mountains, to the vineyards or to the cities, there are endless possibilities for exciting Italy travel. Check out Travel + Leisure’s Italy travel guide to decide what to eat, where to stay and what to see.",
      "price": 34.79,
      "city": "BRAZIL",
      "tour": "2 DAYS 3 NIGHTS",
      "rating": 4.2,
      "ratingCount": "450"
    },
    {
      "key": 2,
      "img": "https://designexpart.com/tm/html/bahon/assets/img/package/package-2.jpg",
      "title": "The Statue of Liberty",
      "desc": " The Statue of Liberty is the land of mouthwatering meals that last all night, heady wines to drink underneath olive trees",
      "descL": "Whether you are heading to the beach or to the mountains, to the vineyards or to the cities, there are endless possibilities for exciting Italy travel. Check out Travel + Leisure’s Italy travel guide to decide what A good place to start is the capital city of Rome, the birthplace of Western civilization and the site of many epic historical events. All the regions of Italy are different and cater to different kinds of vacations—from skiing in the Dolomites to sunning on the Aeolian Islands..",
      "price": 422,
      "city": "NEW YORK",
      "tour": "3 DAYS 3 NIGHTS",
      "rating": 4,
      "ratingCount": "680"
    },
    {
      "key": 3,
      "img": "https://designexpart.com/tm/html/bahon/assets/img/package/package-3.jpg",
      "title": "STAND OF THILAND",
      "desc": "It is everyone’s dream to travel to THILAND, and for good reason.",
      "descL": "It is everyone’s dream to travel to Italy, and for good reason. Whether you are heading to the beach or to the mountains, to the vineyards or to the cities, there are endless possibilities for exciting Italy travel. Check out Travel + Leisure’s Italy travel guide to decide what to eat, where to stay and what to see.",
      "price": 495,
      "city": "ROME",
      "tour": "1 DAYS 1 NIGHTS",
      "rating": 210,
      "ratingCount": "350"
    },
    {
      "key": 4,
      "img": "https://designexpart.com/tm/html/bahon/assets/img/package/package-4.jpg",
      "title": "TAJ MAHAL",
      "desc": "Leisure’s INDIA travel guide to decide what to eat, where to stay and what to see.",
      "descL": "A good place to start is the capital city of Rome, the birthplace of Western civilization and the site of many epic historical events. All the regions of Italy are different and cater to different kinds of vacations—from skiing in the Dolomites to sunning on the Aeolian Islands.Leisure’s Italy travel guide to decide what to eat, where to stay and what to see.",
      "price": 48.69,
      "city": "INDIA",
      "tour": "5 DAYS 4 NIGHTS",
      "rating": 750,
      "ratingCount": "560"
    },
    {
      "key": 5,
      "img": "https://designexpart.com/tm/html/bahon/assets/img/package/package-5.jpg",
      "title": "VIEW OF TOKYO",
      "desc": " Italy is the land of mouthwatering meals that last all night, heady wines to drink underneath olive trees",
      "descL": " Italy is the land of mouthwatering meals that last all night, heady wines to drink underneath olive trees, pastel villas built into sheer cliffs above the crystal blue Tyrrhenian Sea, and Renaissance paintings and marble sculptures that leave you awestruck and inspired. It is everyone’s dream to travel to Italy,",
      "price": 469,
      "city": "TOKYO",
      "tour": "2 DAYS 3 NIGHTS .18+",
      "rating": 4,
      "ratingCount": "500"
    },
    {
      "key": 6,
      "img": "https://designexpart.com/tm/html/bahon/assets/img/package/package-6.jpg",
      "title": "SWITZERLAND - COUNTRY OF TRAVEL",
      "desc": "Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis.",
      "descL": "Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel",
      "price": 440,
      "city": "SWITZERLAND",
      "tour": "2 DAYS 3 NIGHTS 18+",
      "rating": 3.5,
      "ratingCount": "500"
    }
  ]

  const result = collection.insertMany(tour);
  console.log('database send hitted');
  console.log(result);

  client.close();
}); */





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