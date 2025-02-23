const Cookbook = require("../models/Cookbook");

// Get all cookbooks
const getCookbooks = async (req, res) => {
  try {
    const cookbooks = await Cookbook.find().populate("recipes");
    res.json(cookbooks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single cookbook by ID
const getCookbookById = async (req, res) => {
  try {
    const cookbook = await Cookbook.findById(req.params.id).populate("recipes");
    if (!cookbook)
      return res.status(404).json({ message: "Cookbook not found" });
    res.json(cookbook);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new cookbook
const createCookbook = async (req, res) => {
  try {
    const newCookbook = await Cookbook.create({
      ...req.body,
      owner: req.user._id, // ensures only logged in users can create a cookbook
    });
    res.status(201).json(newCookbook);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update an existing cookbook
const updateCookbook = async (req, res) => {
  try {
    const updatedCookbook = await Cookbook.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedCookbook)
      return res.status(404).json({ message: "Cookbook not found" });
    res.json(updatedCookbook);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a cookbook
const deleteCookbook = async (req, res) => {
  try {
    const deletedCookbook = await Cookbook.findByIdAndDelete(req.params.id);
    if (!deletedCookbook)
      return res.status(404).json({ message: "Cookbook not found" });
    res.json({ message: "Cookbook deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getCookbooks,
  getCookbookById,
  createCookbook,
  updateCookbook,
  deleteCookbook,
};
