const { Schema, model } = require("mongoose");

const userSchema = new Schema ( {
  name: {
    type: String,
  },
  email: {
    type: String, 
    required: [true, "You must add an email address"],
  },
  password: {
    type: String, 
    required: [true, "You must add a password"]
  },
}, 
 { timestamps: true }
);

module.exports = model("User", userSchema)