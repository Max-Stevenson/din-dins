const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const recipieSchema = new Schema({
  image: { data: Buffer, content: String },
  title: { type: String, trim: true, required: true },
  isVegetarian: { type: Boolean, required: true },
  mealSize: { type: Number, default: 1 },
  ingredients: { type: [String], required: true },
  method: { type: [String], required: true }
});

module.exports = mongoose.model("Recipie", recipieSchema);
