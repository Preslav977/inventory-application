const asyncHandler = require("express-async-handler");
const Album = require("../models/album");
const Song = require("../models/song");

exports.album_list = asyncHandler(async (req, res, next) => {
  const allAlbums = await Album.find().exec();

  res.render("album_list", {
    name: "Album List",
    album_list: allAlbums,
  });
});

exports.album_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: Album detail: ${req.params.id}`);
});

exports.album_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Album create GET");
});

exports.album_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Album create POST");
});

exports.album_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Album delete GET");
});

exports.album_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Album delete POST");
});

exports.album_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Album update GET");
});

exports.album_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Album update POST");
});
