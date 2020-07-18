const { Schema, model } = require("mongoose");

const boardSchema = new Schema ({
    company: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: [true, "You must have a company"]
    },
    title: {
      type: String,
      required: [true, "A title is required"]
    },
  },
  { timestamps: true }
);

module.exports = model("Board", boardSchema);
