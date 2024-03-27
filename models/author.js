/* eslint-disable no-underscore-dangle */
const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const { Schema } = mongoose;

const AuthorSchema = new Schema({
  name: { type: String, minLength: 5, maxLength: 30, required: true },
  featured: { type: String, minLength: 5, maxLength: 30, required: true },
  date_of_birth: { type: Date, required: true },
  // socials: { type: Boolean, required: true },
});

// if author doesn't have name return empty string

AuthorSchema.virtual("author_name").get(function () {
  let authorName = "";

  if (this.name) {
    authorName = `${this.name}`;
  }

  return authorName;
});

AuthorSchema.virtual("url").get(function () {
  return `/store/author/${this._id}`;
});

AuthorSchema.virtual("date_of_birth_formatted").get(function () {
  return DateTime.fromJSDate(this.date_of_birth).toLocaleString(
    DateTime.DATETIME_MED,
  );
});

module.exports = mongoose.model("Author", AuthorSchema);
