const express = require("express");
const { connectToDb, getDb } = require("./db.js");
const { ObjectId } = require("mongodb");

const PORT = 3000;

const app = express();
let db;

connectToDb((err) => {
  if (!err) {
    app.listen(PORT, (err) => {
      err ? console.error(err) : console.log(`Listening port ${PORT}`)
    })
    db = getDb();
  } else {
    console.error(`DB connection error: ${err}`)
  }
})

app.get("/movies", (req, res) => {
  const movies = [];
  db
    .collection("movies")
    .find()
    .sort({ title: 1 })
    .forEach((movie) => movies.push(movie))
    .then(() => {
      res
        .status(200)
        .json(movies)
    })
    .catch(() => {
      res
        .status(500)
        .json({ error: "Something goes wrong..." })
    })
});

app.get("/movies/:id", (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    db
      .collection("movies")
      .findOne({ _id: new ObjectId(req.params.id) })
      .then((document) => {
        res
          .status(200)
          .json(document)
      })
      .catch(() => {
        res
          .status(500)
          .json({ error: "Something goes wrong..." })
      })
  } else {
    res
      .status(500)
      .json({ error: "Wrong id" });
  }
})
