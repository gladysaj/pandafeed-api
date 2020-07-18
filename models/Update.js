const { Schema, model } = require("mongoose");

const updateSchema = new Schema ({
    company: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: [true, "You must have a company"]
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
