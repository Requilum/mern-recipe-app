const mongoose = require("mongoose");

// Ingredient sub-schema
const ingredientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  unit: { type: String, required: true },
});

// Recipe schema
const recipeSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a title"],
    },
    description: {
      type: String,
    },
    ingredients: [ingredientSchema],
    instructions: {
      type: String,
      required: [true, "Please add instructions"],
    },
    imageURL: {
      type: String,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Recipe must have an author"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Recipe", recipeSchema);
