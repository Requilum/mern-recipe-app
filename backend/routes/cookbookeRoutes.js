const express = require("express");
const router = express.Router();
const {
  getCookbooks,
  getCookbookById,
  createCookbook,
  updateCookbook,
  deleteCookbook,
} = require("../controllers/cookbookController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(getCookbooks).post(protect, createCookbook);

router
  .route("/:id")
  .get(getCookbookById)
  .put(protect, updateCookbook)
  .delete(protect, deleteCookbook);

module.exports = router;
