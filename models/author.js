const mongoose = require("mongoose");

const { Schema } = mongoose;

const AuthorSchema = new Schema({
  name: { type: String, minLength: 5, maxLength: 30, required: true },
  featured: { type: String, minLength: 5, maxLength: 30, required: true },
  date_of_birth: { type: Date, required: true },
  single: { type: Boolean, required: true },
  socials: { type: Boolean, required: true },
});

// if author doesn't have name return empty string

AuthorSchema.virtual("name").get(function () {
  let authorName = "";

  if (this.name) {
    authorName = `${this.name}`;
  }

  return authorName;
});

AuthorSchema.virtual("url").get(function () {
  return `/store/author/${this._id}`;
});

module.exports = mongoose.model("Author", AuthorSchema);
