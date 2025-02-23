const mongoose = require("mongoose");

const cookbookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a title for the cookbook"],
    },
    description: {
      type: String,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Cookbook must have an owner"],
    },
    recipes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recipe",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Cookbook", cookbookSchema);
