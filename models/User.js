const { Schema, model } = require("mongoose");

const userSchema = new Schema ( {
  name: {
    type: String,
  },
  email: {
    type: String, 
    required: [true, "You must add an email address"],
    validate: {
      message: "Email address is already in use",
      validator: async (email) => {
        const items = await models["User"].count({ email });
        return items < 1;
      },
    }
  },
  password: {
    type: String, 
    required: [true, "You must add a password"]
  }
}, 
 { timestamps: true }
);

module.exports = model("User", userSchema)