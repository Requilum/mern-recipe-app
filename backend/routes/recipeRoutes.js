const express = require("express");
const router = express.Router();
const {
  getRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
} = require("../controllers/recipeController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(getRecipes).post(protect, createRecipe); // Protected route

router
  .route("/:id")
  .get(getRecipeById)
  .put(protect, updateRecipe) // Protected route
  .delete(protect, deleteRecipe); // Protected route

module.exports = router;
