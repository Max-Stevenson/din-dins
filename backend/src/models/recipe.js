const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  image: { data: Buffer, content: String },
  title: { type: String, trim: true, required: true },
  isVegetarian: { type: String, required: true },
  mealSize: { type: Number, default: 1 },
  ingredients: {
    type: [
      {
        quantity: { type: Number, required: true },
        measure: { type: String },
        item: { type: String, required: true }
      }
    ],
    required: true
  },
  method: { type: [String], required: true }
});

module.exports = mongoose.model("Recipe", recipeSchema);
