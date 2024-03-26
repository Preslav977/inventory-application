const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const Genre = require("../models/genre");
const Song = require("../models/song");

exports.genre_list = asyncHandler(async (req, res, next) => {
  const allGenres = await Genre.find().exec();

  res.render("genre_list", {
    title: "Genre List",
    genre_list: allGenres,
  });
});

exports.genre_detail = asyncHandler(async (req, res, next) => {
  const [genre, songsInGenre] = await Promise.all([
    Genre.findById(req.params.id).exec(),
    Song.find({ genre: req.params.id }, "title").exec(),
  ]);

  if (genre === null) {
    const err = new Error("Genre not found");
    err.status = 404;
    return next(err);
  }

  res.render("genre_detail", {
    title: "Genre Detail",
    genre,
    genre_songs: songsInGenre,
  });
});

exports.genre_create_get = (req, res, next) => {
  res.render("genre_form", { title: "Create Genre" });
};

exports.genre_create_post = [
  body(
    "name",
    "Genre name must contain at least 5 characters and shouldn't not have more than 30 characters",
  )
    .trim()
    .isLength({ min: 5 })
    .isLength({ max: 30 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const genre = new Genre({ name: req.body.name });

    if (!errors.isEmpty()) {
      res.render("genre_form", {
        title: "Create New Genre",
        genre,
        errors: errors.array(),
      });
    } else {
      const genreExists = await Genre.findOne({
        name: req.body.name,
      })
        .collation({ locale: "en", strength: 2 })
        .exec();

      if (genreExists) {
        res.redirect(genreExists.url);
      } else {
        await genre.save();

        res.redirect(genre.url);
      }
    }
  }),
];

exports.genre_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Genre delete GET");
});

exports.genre_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Genre delete POST");
});

exports.genre_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Genre update GET");
});

exports.genre_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Genre update POST");
});
