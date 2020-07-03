const { Schema, model } = require("mongoose");

const userSchema = new Schema ( {
  name: {
    type: String,
  },
  email: {
    type: String, 
    required: [true, "You must add an email address"]
    // validate: {
    //   message: "Email address is already in use",
    //   validator: async (email) => {
    //     const items = await models["User"].count({ email });
    //     return items < 1;
    //   },
    // }
  },
  password: {
    type: String, 
    required: [true, "You must add a password"]
  },
  // profile_picture: {
  //   type: String,
  // }, 
  // company_name: {
  //   type: Schema.Types.ObjectId,
  //   ref: "Company",
  //   required: [true, "You must belong to a company"]
  // }
}, 
 { timestamps: true }
);

module.exports = model("User", userSchema)