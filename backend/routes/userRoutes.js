// backend/routes/userRoutes.js
const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  deleteProfile,
  getFavorites,
  addFavorite,
  removeFavorite,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);

// Profile management endpoints (protected)
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);
router.delete("/profile", protect, deleteProfile);

// Favorites management endpoints (protected)
router.get("/favorites", protect, getFavorites);
router.post("/favorites", protect, addFavorite);
router.delete("/favorites/:id", protect, removeFavorite);

module.exports = router;
