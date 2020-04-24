const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const recipieSchema = new Schema({
  image: { type: Buffer},
  title: { type: String, required: true },
  

});

module.exports = mongoose.model("Recipie", recipieSchema);
