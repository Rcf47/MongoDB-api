const express = require("express");
const { connectToDb, getDb } = require("./db.js")

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

