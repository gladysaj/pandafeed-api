const { Schema, model } = require("mongoose");

const boardSchema = new Schema ( {
  title: {
    type: String,
  }, 
  description: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "You must have a valid user"]
  },
  comments: {
    type: String,
  },
  votes: {
    type: Number,
  },
  status: {
    type: String,
    enum: ["Open", "Closed"],
    default: "Open"
  }
});

module.exports = model("Board", boardSchema);