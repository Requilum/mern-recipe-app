// backend/controllers/userController.js
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

// Registration
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  // Check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create new user
  const user = await User.create({
    name,
    email,
    hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }),
    });
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }
};

// Login
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.hashedPassword))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }),
    });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
};

// Profile Management Endpoints

// Get the current user's profile
const getProfile = async (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

// Update the current user's profile
const updateProfile = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete the current user's account
const deleteProfile = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user._id);
    res.json({ message: "User account deleted successfully." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Favorites Management Endpoints

// Get the current user's favorite recipes
const getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("favorites");
    if (user) {
      res.json(user.favorites);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a recipe to the current user's favorites
const addFavorite = async (req, res) => {
  try {
    const { recipeId } = req.body;
    const user = await User.findById(req.user._id);
    if (user) {
      if (!user.favorites.includes(recipeId)) {
        user.favorites.push(recipeId);
        await user.save();
        res.json({
          message: "Recipe added to favorites.",
          favorites: user.favorites,
        });
      } else {
        res.status(400).json({ message: "Recipe already in favorites." });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Remove a recipe from the current user's favorites
const removeFavorite = async (req, res) => {
  try {
    const recipeId = req.params.id;
    const user = await User.findById(req.user._id);
    if (user) {
      user.favorites = user.favorites.filter(
        (id) => id.toString() !== recipeId
      );
      await user.save();
      res.json({
        message: "Recipe removed from favorites.",
        favorites: user.favorites,
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  deleteProfile,
  getFavorites,
  addFavorite,
  removeFavorite,
};
