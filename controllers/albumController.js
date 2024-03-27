const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const Album = require("../models/album");
const Song = require("../models/song");

exports.album_list = asyncHandler(async (req, res, next) => {
  const allAlbums = await Album.find().exec();

  res.render("album_list", {
    title: "Album List",
    album_list: allAlbums,
  });
});

exports.album_detail = asyncHandler(async (req, res, next) => {
  const [album] = await Promise.all([Album.findById(req.params.id).exec()]);

  if (album === null) {
    const err = new Error("Album not found");
    err.status = 404;
    return next(err);
  }

  res.render("album_detail", {
    title: album.name,
    album,
  });
});

exports.album_create_get = asyncHandler(async (req, res, next) => {
  const allAlbums = await Album.find().sort({ name: 1 }).exec();

  res.render("album_form", {
    title: "Create New Album",
    albums: allAlbums,
  });
});

exports.album_create_post = [
  body("name", "Name must be at least 5 characters and not over 30 characters")
    .trim()
    .isLength({ min: 5 })
    .isLength({ max: 30 })
    .escape(),
  body("date_released", "Invalid date of released").isISO8601().toDate(),
  body(
    "available",
    "Available must be at least 1 characters and not over 20 characters",
  )
    .trim()
    .isLength({ min: 1 })
    .isLength({ max: 20 })
    .escape(),
  body(
    "price",
    "Price must be at least 1 characters and not over 20 characters",
  )
    .trim()
    .isLength({ min: 1 })
    .isLength({ max: 20 })
    .escape(),
  body("status").escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const album = new Album({
      name: req.body.name,
      date_released: req.body.date_released,
      available: req.body.available,
      price: req.body.price,
      status: req.body.status,
    });

    if (!errors.isEmpty()) {
      const allAlbums = await Album.find().sort({ name: 1 }).exec();

      res.render("album_form", {
        title: "Create New Album",
        albums: allAlbums,
        errors: errors.array(),
      });
    } else {
      await album.save();
      res.redirect(album.url);
    }
  }),
];

exports.album_delete_get = asyncHandler(async (req, res, next) => {
  const album = await Album.findById(req.params.id).exec();

  if (album === null) {
    res.redirect("/store/albums");
  }

  res.render("album_delete", {
    title: "Delete album",
    album,
  });
});

exports.album_delete_post = asyncHandler(async (req, res, next) => {
  await Album.findByIdAndDelete(req.body.id)

  res.redirect("/store/albums")
});

exports.album_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Album update GET");
});

exports.album_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Album update POST");
});
