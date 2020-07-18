const { Schema, model } = require("mongoose");

const updateSchema = new Schema ({
    changelog: {
      type: Schema.Types.ObjectId,
      ref: "Changelog",
      required: [true, "You must have a changelog"]
    },
    title: {
      type: String,
      required: [true, "A title is required"]
    },
    body: {
      type: String,
      required: [true, "A description should be provided"]
    },
    type: {
      type: String,
      enum: ["New", "Improvement", "Fix"],
      required: [true, "You need to provide a type"]
    }
  },
  { timestamps: true }
);

module.exports = model("Update", updateSchema);
