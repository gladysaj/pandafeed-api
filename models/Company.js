const { Schema, model } = require("mongoose");

const companySchema = new Schema ({
  company_name: {
    type: String,
  },
  logo: {
    type: String,
    required: [true, "You need to add an image"]
  }, 
  description: {
    type: String,
    minlength: [20, "Description must be min 20 characters"],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "You must have a valid user"]
  }
 },
 { timestamps: true }
);

module.exports = model("Company", companySchema);