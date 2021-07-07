const express = require("express");
const router = express.Router();
const {
	getAllCategories,
	addCategory,
	getCategoryById,
} = require("../controllers/categories.controller");

router.route("/").get(getAllCategories).post(addCategory);

router.route("/:categoryId").get(getCategoryById);

module.exports = router;
