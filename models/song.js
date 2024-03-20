const mongoose = require("mongoose");

const { Schema } = mongoose;

const SongSchema = new Schema({
  title: { type: String, minLength: 5, maxLength: 20, required: true },
  author: { type: Schema.Types.ObjectId, ref: "Author", required: true },
  song_duration: { type: Number, maxLength: 5, required: true },
  date_released: { type: Date, required: true },
  channel_released: {
    type: String,
    minLength: 5,
    maxLength: 20,
    required: true,
  },
  genre: [{ type: Schema.Types.ObjectId, ref: "Genre" }],
});

SongSchema.virtual("url").get(function () {
  return `/store/song/${this._id}`;
});

module.exports = mongoose.model("Song", SongSchema);
