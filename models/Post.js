const { Schema, model, SchemaTypes } = require('mongoose');

const postSchema = new Schema ({
  board: {
    type: Schema.Types.ObjectId,
    ref: "Board",
    required: [true, "You need to add a board"]
  }, 
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "You need to have a user"]
  },
  title: {
    type: String, 
    maxlength: [60, "Titile should have max 60 characters"],
    required: [true, "You need to add a title"]
  }, 
  details: {
    type: String,
  }, 
  upvotes: {
    type: Number,
    default: 1,
  }
})

module.exports = model("Post", postSchema);