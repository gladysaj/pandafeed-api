const { Schema, model } = require("mongoose");

const changelogSchema = new Schema ({
    company: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: [true, "You must have a company created"]
    },
  },
  { timestamps: true }
);

module.exports = model("Changelog", changelogSchema);