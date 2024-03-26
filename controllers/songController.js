const asyncHandler = require("express-async-handler");
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
  res.send("NOT IMPLEMENTED: Song create GEt");
});

exports.song_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Song create POST");
});

exports.song_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Song delete GET");
});

exports.song_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Song delete POST");
});

exports.song_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Song update GET ");
});

exports.song_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Song update POST");
});
