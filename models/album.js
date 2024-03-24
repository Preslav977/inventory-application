const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const { Schema } = mongoose;

const AlbumSchema = new Schema({
  name: { type: String, minLength: 5, maxLength: 30, required: true },
  date_released: { type: Date, required: true },
  available: { type: Number, minLength: 1, required: true },
  price: { type: Number, minLength: 1, required: true },
  status: {
    type: String,
    required: true,
    enum: ["Available", "Not Available", "Coming Soon", "Reserved"],
    default: "Coming Soon",
  },
});

AlbumSchema.virtual("url").get(function () {
  return `/store/album/${this._id}`;
});

AlbumSchema.virtual("date_released_formatted").get(function () {
  return DateTime.fromJSDate(this.date_released).toLocaleString(
    DateTime.DATETIME_MED,
  );
});

module.exports = mongoose.model("Album", AlbumSchema);
