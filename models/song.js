const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const { Schema } = mongoose;

const SongSchema = new Schema({
  title: { type: String, minLength: 5, maxLength: 20, required: true },
  author: { type: Schema.Types.ObjectId, ref: "Author", required: true },
  song_duration: { type: String, maxLength: 5, required: true },
  date_released: { type: Date, required: true },
  channel_released: {
    type: String,
    minLength: 5,
    maxLength: 20,
    required: true,
  },
  available: { type: Number, minLength: 1, maxLength: 20, required: true },
  price: { type: Number, minLength: 1, maxLength: 20, required: true },
  genre: [{ type: Schema.Types.ObjectId, ref: "Genre" }],
  album: [{ type: Schema.Types.ObjectId, ref: "Album" }],
});

SongSchema.virtual("url").get(function () {
  return `/store/song/${this._id}`;
});

SongSchema.virtual("date_released_formatted").get(function () {
  return DateTime.fromJSDate(this.date_released).toLocaleString(
    DateTime.DATETIME_MED,
  );
});

module.exports = mongoose.model("Song", SongSchema);
