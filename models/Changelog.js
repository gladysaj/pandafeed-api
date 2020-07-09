const { Schema, model } = require("mongoose");

const changelogSchema = new Schema ( {
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "You must have a valid user"]
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: "Company",
    required: [true, "You must have a company created"]
  },
  title: {
    type: String,
  }, 
  description: {
    type: String,
  },
  // comments: {
  //   type: String,
  // },
  // votes: {
  //   type: Number,
  // },
  // status: {
  //   type: String,
  //   enum: ["Open", "Closed"],
  //   default: "Open"
  // }
},
{ timestamps: true }
);

module.exports = model("Changelog", changelogSchema);