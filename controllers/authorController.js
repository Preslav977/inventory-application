const asyncHandler = require("express-async-handler");
const Author = require("../models/author");
const Song = require("../models/song");

exports.author_list = asyncHandler(async (req, res, next) => {
  const allAuthors = await Author.find().sort({ name: 1 }).exec();

  res.render("author_list", {
    title: "Author List",
    author_list: allAuthors,
  });
});

exports.author_detail = asyncHandler(async (req, res, next) => {
  const [author, allSongsByAuthor] = await Promise.all([
    Author.findById(req.params.id).exec(),
    Song.find({ author: req.params.id }, "title").exec(),
  ]);

  if (author === null) {
    const err = new Error("Author not found");
    err.status = 404;
    return next(err);
  }

  res.render("author_detail", {
    title: "Author Detail",
    author,
    author_songs: allSongsByAuthor,
  });
});

exports.author_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Author create GET");
});

exports.author_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Author create POST");
});

exports.author_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Author delete GET");
});

exports.author_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Author delete POST");
});

exports.author_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Author update GET");
});

exports.author_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Author update POST");
});
