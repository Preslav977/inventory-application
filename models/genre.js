const mongoose = require("mongoose");

const { Schema } = mongoose;

const GenreSchema = new Schema({
  name: { type: String, minLength: 5, maxLength: 39, required: true },
});

GenreSchema.virtual("url").get(function () {
  return `/store/genre/${this._id}`;
});

module.exports = mongoose.model("Genre", GenreSchema);
