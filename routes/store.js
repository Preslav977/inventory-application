const express = require("express");

const router = express.Router();

const song_controller = require("../controllers/songController");

const author_controller = require("../controllers/authorController");

const genre_controller = require("../controllers/genreController");

const album_controller = require("../controllers/albumController");

router.get("/", song_controller.index);

router.get("/song/create", song_controller.song_create_get);

router.post("/song/create", song_controller.song_create_post);

router.get("/song/:id/delete", song_controller.song_delete_get);

router.post("/song/:id/delete", song_controller.song_delete_post);

router.get("/song/:id/update", song_controller.song_update_get);

router.post("/song/:id/update", song_controller.song_update_post);

router.get("/book/:id", song_controller.song_detail);

router.get("/songs", song_controller.song_list);

/// /////////////////////////////////////////////////////////////////

router.get("/author/create", author_controller.author_create_get);

router.post("/author/create", author_controller.author_create_post);

router.get("/author/:id/delete", author_controller.author_delete_get);

router.post("/author/:id/delete", author_controller.author_delete_post);

router.get("/author/:id/update", author_controller.author_update_get);

router.post("/author/:id/update", author_controller.author_update_post);

router.get("/author/:id", author_controller.author_detail);

router.get("/authors", author_controller.author_list);

/// ////////////////////////////////////////////////////////////////////