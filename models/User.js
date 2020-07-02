const { Schema, model } = require("mongoose");

const userSchema = new Schema ( {
  name: {
    type: String,
  },
  email: {
    type: String, 
    required: [true, "You must add an email address"],
    validate: {
      message: "Email address is already in use"
    }
  },
  password: {
    type: String, 
    required: [true, "You must add a password"]
  }, 
  profile_picture: {
    type: String,
  }, 
  company_name: {
    type: Schema.Types.ObjectId,
    ref: "Company",
    required: [true, "You must belong to a company"]
  }
}, 
 { timestamps: true }
);

module.exports = model("User", userSchema)