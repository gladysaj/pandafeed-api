const { Schema, model } = require("mongoose");

const updatesSchema = new Schema ( {
   changelog: {
     type: Schema.Types.ObjectId,
     ref: "Changelog",
     required: [true, "You must have a product in your changelog board"]
   },
   title: {
     type: String, 
     required: [true, "A title is required"]
   },
   description: {
     type: String,
     required: [true, "A description should be provided"]
   }, 
   version_update: {
    type: Number,
    required: [true, "You must add a version number"]
  }
}, 
 {timestamps: true}
)

module.exports = model("Updates", updatesSchema);