const { Schema, model } = require("mongoose");

const companySchema = new Schema ({
    companyName: {
      type: String, 
      required: [true, "You need to add a company name"],
    },
    logo: {
      type: String,
      // required: [true, "You need to add an image"]
    }, 
    // description: {
    //   type: String,
    //   required: [true, "You need to add a description"],
    //   minlength: [20, "Description must be min 20 characters"],
    //   maxlength: [140, "Description must be max 140 characters"],
    // },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "You must have a valid user"]
    }
  },
  { timestamps: true }
);

module.exports = model("Company", companySchema);