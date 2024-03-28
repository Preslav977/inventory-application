/* eslint-disable no-restricted-syntax */
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const Song = require("../models/song");
const Author = require("../models/author");
const Genre = require("../models/genre");
const Album = require("../models/album");

exports.index = asyncHandler(async (req, res, next) => {
  const [numSongs, numAlbums, numAvailableAlbums, numAuthors, numGenres] =
    await Promise.all([
      Song.countDocuments({}).exec(),
      Album.countDocuments({}).exec(),
      Album.countDocuments({ status: "Available" }).exec(),
      Author.countDocuments({}).exec(),
      Genre.countDocuments({}).exec(),
    ]);

  res.render("index", {
    title: "Music Store",
    song_count: numSongs,
    album_count: numAlbums,
    album_available_count: numAvailableAlbums,
    author_count: numAuthors,
    genre_count: numGenres,
  });
});

exports.song_list = asyncHandler(async (req, res, next) => {
  const allSongs = await Song.find({}, "title author channel_released")
    .sort({ title: 1 })
    .populate("author")
    .exec();

  res.render("song_list", { title: "Song List", song_list: allSongs });
});

exports.song_detail = asyncHandler(async (req, res, next) => {
  const [song] = await Promise.all([
    Song.findById(req.params.id)
      .populate("author")
      .populate("genre")
      .populate("album")
      .exec(),
  ]);

  if (song === null) {
    const err = new Error("Song not found");
    err.status = 404;
    return next(err);
  }

  res.render("song_detail", {
    title: song.title,
    song,
  });
});

exports.song_create_get = asyncHandler(async (req, res, next) => {
  const [allAuthors, allGenres, allAlbums] = await Promise.all([
    Author.find().sort({ name: 1 }).exec(),
    Genre.find().sort({ name: 1 }).exec(),
    Album.find().sort({ name: 1 }).exec(),
  ]);

  res.render("song_form", {
    title: "Create New Song",
    authors: allAuthors,
    genres: allGenres,
    albums: allAlbums,
  });
});

exports.song_create_post = [
  (req, res, next) => {
    if (!Array.isArray(req.body.genre)) {
      req.body.genre =
        typeof req.body.genre === "undefined" ? [] : [req.body.genre];
    }
    next();
  },

  body(
    "title",
    "Title must be at least 5 characters and not over 20 characters",
  )
    .trim()
    .isLength({ min: 5 })
    .isLength({ max: 20 })
    .escape(),
  body(
    "author",
    "Author must be at least 5 characters and not over 30 characters",
  )
    .trim()
    .isLength({ min: 5 })
    .isLength({ max: 30 })
    .escape(),
  body("song_duration", "Song duration must not be more than 5 characters")
    .trim()
    .isLength({ max: 5 })
    .escape(),
  body("date_released", "Invalid date of birth").isISO8601().toDate(),
  body(
    "channel_released",
    "Channel name should be at least 5 characters not more than 20 characters",
  )
    .trim()
    .isLength({ min: 5 })
    .isLength({ max: 20 })
    .escape(),
  body(
    "available",
    "Available must be at least 1 characters, and not more than 20 characters",
  )
    .trim()
    .isLength({ min: 1 })
    .isLength({ max: 20 })
    .escape(),
  body(
    "price",
    "Price must be at least 1 characters and not more than 20 characters",
  )
    .trim()
    .isLength({ min: 1 })
    .isLength({ max: 20 })
    .escape(),
  body("genre.*").escape(),
  body(
    "album",
    "Album must be at least 5 characters and not over 30 characters",
  )
    .trim()
    .isLength({ min: 5 })
    .isLength({ max: 30 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const song = new Song({
      title: req.body.title,
      author: req.body.author,
      song_duration: req.body.song_duration,
      date_released: req.body.date_released,
      channel_released: req.body.channel_released,
      available: req.body.available,
      price: req.body.price,
      genre: req.body.genre,
      album: req.body.album,
    });

    if (!errors.isEmpty()) {
      const [allAuthors, allGenres, allAlbums] = await Promise.all([
        Author.find().sort({ name: 1 }).exec(),
        Genre.find().sort({ name: 1 }).exec(),
        Album.find().sort({ name: 1 }).exec(),
      ]);

      for (const genre of allGenres) {
        if (song.genre.includes(genre._id)) {
          genre.checked = "true";
        }

        res.render("song_form", {
          title: "Create New Song",
          authors: allAuthors,
          genres: allGenres,
          albums: allAlbums,
          song,
          errors: errors.array(),
        });
      }
    } else {
      await song.save();
      res.redirect(song.url);
    }
  }),
];

exports.song_delete_get = asyncHandler(async (req, res, next) => {
  const [song] = await Promise.all([
    Song.findById(req.params.id).populate("author").populate("genre").exec(),
  ]);

  if (song === null) {
    res.redirect("/store/songs");
  }

  res.render("song_delete", {
    title: "Delete Song",
    song,
  });
});

exports.song_delete_post = asyncHandler(async (req, res, next) => {
  const [song] = await Promise.all([
    Song.findById(req.params.id).populate("author").populate("genre").exec(),
  ]);

  if (song === null) {
    res.redirect("/store/songs");
  }

  res.render("song_delete", {
    title: "Delete Song",
    song,
  });

  await Song.findByIdAndDelete(req.body.id);
  res.redirect("/store/songs");
});

exports.song_update_get = asyncHandler(async (req, res, next) => {
  const [song, allAuthors, allGenres, allAlbums] = await Promise.all([
    Song.findById(req.params.id).exec(),
    Author.find().sort({ name: 1 }).exec(),
    Genre.find().sort({ name: 1 }).exec(),
    Album.find().sort({ name: 1 }).exec(),
  ]);

  if (song === null) {
    const err = new Error("Song not found");
    err.status = 404;
    return next(err);
  }

  allGenres.forEach((genre) => {
    if (song.genre.includes(genre._id)) genre.checked = "true";
  });

  res.render("song_form", {
    title: "Update Song",
    song,
    authors: allAuthors,
    genres: allGenres,
    albums: allAlbums,
  });
});

exports.song_update_post = [
  (req, res, next) => {
    if (!Array.isArray(req.body.genre)) {
      req.body.genre =
        typeof req.body.genre === "undefined" ? [] : [req.body.genre];
    }
    next();
  },

  body(
    "title",
    "Title must be at least 5 characters and not over 20 characters",
  )
    .trim()
    .isLength({ min: 5 })
    .isLength({ max: 20 })
    .escape(),
  body(
    "author",
    "Author must be at least 5 characters and not over 30 characters",
  )
    .trim()
    .isLength({ min: 5 })
    .isLength({ max: 30 })
    .escape(),
  body("song_duration", "Song duration must not be more than 5 characters")
    .trim()
    .isLength({ max: 5 })
    .escape(),
  body("date_released", "Invalid date of birth").isISO8601().toDate(),
  body(
    "channel_released",
    "Channel name should be at least 5 characters not more than 20 characters",
  )
    .trim()
    .isLength({ min: 5 })
    .isLength({ max: 20 })
    .escape(),
  body(
    "available",
    "Available must be at least 1 characters, and not more than 20 characters",
  )
    .trim()
    .isLength({ min: 1 })
    .isLength({ max: 20 })
    .escape(),
  body(
    "price",
    "Price must be at least 1 characters and not more than 20 characters",
  )
    .trim()
    .isLength({ min: 1 })
    .isLength({ max: 20 })
    .escape(),
  body("genre.*").escape(),
  body(
    "album",
    "Album must be at least 5 characters and not over 30 characters",
  )
    .trim()
    .isLength({ min: 5 })
    .isLength({ max: 30 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const song = new Song({
      title: req.body.title,
      author: req.body.author,
      song_duration: req.body.song_duration,
      date_released: req.body.date_released,
      channel_released: req.body.channel_released,
      available: req.body.available,
      price: req.body.price,
      genre: typeof req.body.genre === "undefined" ? [] : req.body.genre,
      album: req.body.album,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      const [allAuthors, allGenres, allAlbums] = await Promise.all([
        Author.find().sort({ name: 1 }).exec(),
        Genre.find().sort({ name: 1 }).exec(),
        Album.find().sort({ name: 1 }).exec(),
      ]);

      for (const genre of allGenres) {
        if (song.genre.includes(genre._id)) {
          genre.checked = "true";
        }
      }

      res.render("song_form", {
        title: "Update Song",
        authors: allAuthors,
        genres: allGenres,
        albums: allAlbums,
        song,
        errors: errors.array(),
      });
    } else {
      const updateSong = await Song.findByIdAndUpdate(req.params.id, song, {});
      res.redirect(updateSong.url);
    }
  }),
];
