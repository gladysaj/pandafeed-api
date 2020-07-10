const { Schema, model } = require("mongoose");

const changelogSchema = new Schema ( {
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "You must have a user"]
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: "Company",
    required: [true, "You must have a company created"]
  },
  title: {
    type: String,
    required: [true, "Title is required"]
  }, 
  description: {
    type: String,
    required: [true, "Description should be provided"]
  },
  version: {
    type: Number,
    required: [true, "You must add the version number"]
  }
},
{ timestamps: true }
);

module.exports = model("Changelog", changelogSchema);