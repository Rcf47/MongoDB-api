const express = require("express");
const mongoose = require('mongoose')
const movieRouter = require('./routes/movie-routes.js')

const PORT = 3000;
const URL = "mongodb://localhost:27017/moviebox";

const app = express();
app.use(express.json())
app.use(movieRouter)

mongoose
  .connect(URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => { `DB connection error: ${err}` })


app.listen(PORT, (err) => {
  err ? console.log(err) : console.log(`listening port ${PORT}`);
});
