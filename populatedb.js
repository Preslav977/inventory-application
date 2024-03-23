#! /usr/bin/env node

console.log(
  'This script populates some test songs, authors, genres and albums to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"',
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const mongoose = require("mongoose");
const Song = require("./models/song");
const Author = require("./models/author");
const Genre = require("./models/genre");
const Album = require("./models/album");

const genres = [];
const authors = [];
const songs = [];
const albums = [];

mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createGenres();
  await createAuthors();
  await createAlbums();
  await createSongs();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

// We pass the index to the ...Create functions so that, for example,
// genre[0] will always be the Nu Disco genre, regardless of the order
// in which the elements of promise.all's argument complete.
async function genreCreate(index, name) {
  const genre = new Genre({ name });
  await genre.save();
  genres[index] = genre;
  console.log(`Added genre: ${name}`);
}

async function authorCreate(index, name, featured, d_birth) {
  const authordetail = { name, featured };
  if (d_birth !== false) authordetail.date_of_birth = d_birth;
  //   if (socials !== false) authordetail.socials = socials;

  const author = new Author(authordetail);

  await author.save();
  authors[index] = author;
  console.log(`Added author: ${name} ${featured}`);
}

async function songCreate(
  index,
  title,
  author,
  song_duration,
  date_released,
  channel_released,
  available,
  price,
  genre,
  album,
) {
  const songdetail = {
    title,
    author,
    song_duration,
    date_released,
    channel_released,
    available,
    price,
    genre,
    album,
  };
  if (genre !== false) songdetail.genre = genre;
  if (album !== false) songdetail.album = album;

  const song = new Song(songdetail);
  await song.save();
  songs[index] = song;
  console.log(`Added song: ${title} ${channel_released}`);
}

async function albumCreate(
  index,
  name,
  date_released,
  available,
  price,
  status,
) {
  const albumdetail = {
    name,
    date_released,
    available,
    price,
    status,
  };

  if (status !== false) albumdetail.status = status;

  const album = new Album(albumdetail);
  await album.save();
  albums[index] = album;
  console.log(`Added album: ${name}`);
}

async function createGenres() {
  console.log("Adding genres");
  await Promise.all([
    genreCreate(0, "Nu Disco"),
    genreCreate(1, "Electro"),
    genreCreate(2, "House"),
    genreCreate(3, "Glitch Hop"),
    genreCreate(4, "Future Bass"),
  ]);
}

async function createAlbums() {
  console.log("Adding albums");
  await Promise.all([
    albumCreate(0, "We are coming", "2020-06-24", 20, 15, "Available"),
    albumCreate(1, "Here we gooo", "2016-08-15,", 50, 5, "Coming Soon"),
    albumCreate(2, "Drop it", "2014-05-15", 10, 4, "Reserved"),
    albumCreate(3, "Nailed it", "2012-07-17", 50, 12, "Not Available"),
  ]);
}

async function createAuthors() {
  console.log("Adding authors");
  await Promise.all([
    authorCreate(0, "Televizor", "Direkt", "1980-01-06"),
    authorCreate(1, "Lazblo", "KIIRO", "1990-7-1"),
    authorCreate(2, "Kaster", "AZBLE", "2000-10-15"),
    authorCreate(3, "Binku", "Anezo", "2004-3-1"),
    authorCreate(4, "sbleq", "Au612", "2001-4-3"),
  ]);
}

async function createSongs() {
  console.log("Adding Song");
  await Promise.all([
    songCreate(
      0,
      "Love You",
      authors[0],
      "3:24",
      "2022-01-6",
      "Monsterkat",
      12,
      35,
      [genres[0]],
      [albums[0]],
    ),
    songCreate(
      1,
      "See You Drop",
      authors[1],
      "5:15",
      "2019-08-7",
      "Suicideshiip",
      6,
      21,
      [genres[1]],
      [albums[1]],
    ),
    songCreate(
      2,
      "Truths",
      authors[2],
      "2:30",
      "2018-06-1",
      "Proximiti",
      2,
      50,
      [genres[2]],
      [albums[2]],
    ),
    songCreate(
      3,
      "IRK WE",
      authors[3],
      "4:12",
      "2017-07-7",
      "Brap City",
      16,
      12,
      [genres[3]],
      [albums[3]],
    ),
    songCreate(
      4,
      "Nightbreak",
      authors[4],
      "3:26",
      2021 - 12 - 2,
      "Houze City",
      7,
      16,
      [genres[4]],
      [albums[0]],
    ),
    songCreate(
      5,
      "Blue Pill",
      authors[0],
      "4:44",
      "2024-03-1",
      "Monsterdog",
      16,
      7,
      [genres[1]],
      [albums[2]],
    ),
    songCreate(
      6,
      "So Absurd",
      authors[3],
      "2:41",
      "2021-09-5",
      "City Musik",
      25,
      5,
      [genres[4]],
      [albums[2]],
    ),
  ]);
}
