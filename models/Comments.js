const { Schema, model } = require("mongoose");

const commentSchema = new Schema ( {
    changelog: {
      type: Schema.Types.ObjectId,
      ref: "Changelog",
      required: [true, "You must"]
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "You must be registered to be able to comment"]
    },
    comment: {
      type: String,
      min: [5, "You must provide a comment"]
    }
});

module.exports = model("Comments", commentSchema);