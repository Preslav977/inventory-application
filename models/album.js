const mongoose = require("mongoose");

const { Schema } = mongoose;

const AlbumSchema = new Schema({
  name: { type: String, minLength: 5, maxLength: 50, required: true },
  date_released: { type: Date, required: true },
  available: { type: Number, required: true },
  price: { type: Number, required: true },
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

module.exports = mongoose.model("Album", AlbumSchema);
