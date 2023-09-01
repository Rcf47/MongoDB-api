const express = require("express");
const Movie = require('../models/movie.js')

const router = express.Router()
const handleError = (res, error) => {
  res.status(500).json({ error })
}
router.get("/movies", (req, res) => {
  Movie
    .find()
    .sort({ title: 1 })
    .then((movies) => {
      res
        .status(200)
        .json(movies)
    })
    .catch(() => handleError(res, "Something goes wrong..."))
});

router.get("/movies/:id", (req, res) => {
  Movie
    .findById(req.params.id)
    .then((movie) => {
      res
        .status(200)
        .json(movie)
    })
    .catch(() => handleError(res, "Something goes wrong..."))
})


router.delete("/movies/:id", (req, res) => {
  Movie
    .findByIdAndDelete(req.params.id)
    .then((result) => {
      res
        .status(200)
        .json(result)
    })
    .catch(() => handleError(res, "Something goes wrong..."))

})

router.post("/movies/", (req, res) => {
  const movie = new Movie(req.body)
  movie
    .save()
    .then((result) => {
      res
        .status(201)
        .json(result)
    })
    .catch(() => handleError(res, "Something goes wrong..."))

})

router.patch('/movies/:id', (req, res) => {
  Movie
    .findByIdAndUpdate(req.params.id, req.body)
    .then((result) => {
      res
        .status(200)
        .json(result);
    })
    .catch(() => handleError(res, "Something goes wrong..."));
});

module.exports = router
