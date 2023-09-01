const Movie = require('../models/movie.js')


const handleError = (res, error) => {
  res.status(500).json({ error })
}

const getMovies = (req, res) => {
  Movie
    .find()
    .sort({ title: 1 })
    .then((movies) => {
      res
        .status(200)
        .json(movies)
    })
    .catch(() => handleError(res, "Something goes wrong..."))
}

const getMovie = (req, res) => {
  Movie
    .findById(req.params.id)
    .then((movie) => {
      res
        .status(200)
        .json(movie)
    })
    .catch(() => handleError(res, "Something goes wrong..."))
}

const deleteMovie = (req, res) => {
  Movie
    .findByIdAndDelete(req.params.id)
    .then((result) => {
      res
        .status(200)
        .json(result)
    })
    .catch(() => handleError(res, "Something goes wrong..."))
}

const addMovie = (req, res) => {
  const movie = new Movie(req.body)
  movie
    .save()
    .then((result) => {
      res
        .status(201)
        .json(result)
    })
    .catch(() => handleError(res, "Something goes wrong..."))
}

const updateMovie = (req, res) => {
  Movie
    .findByIdAndUpdate(req.params.id, req.body)
    .then((result) => {
      res
        .status(200)
        .json(result);
    })
    .catch(() => handleError(res, "Something goes wrong..."));
}

module.exports = {
  getMovies,
  getMovie,
  deleteMovie,
  addMovie,
  updateMovie,
}
