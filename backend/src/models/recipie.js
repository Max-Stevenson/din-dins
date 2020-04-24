const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const recipieSchema = new Schema({
  // image: { data: Buffer, content: String},
  title: { type: String, required: true },
  

});

module.exports = mongoose.model("Recipie", recipieSchema);
