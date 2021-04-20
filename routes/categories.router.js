const express = require("express");
const router = express.Router();
const Category = require("../model/categories.model");
const mongoose = require("mongoose");

router.get("/", (req, res) => {
	Category.find({})
		.populate("products")
		.select("-__v")
		.then((data) => {
			res.json({ categories: data });
		})
		.catch((error) => {
			console.error(error);
			res.json({ message: "Some error occurred!" });
		});
});

router.post("/", (req, res) => {
	const category = req.body;
	const newCategory = new Category(category);
	newCategory
		.save()
		.then((data) => {
			res.status(201).json({ category: data });
		})
		.catch((error) => {
			console.error(error);
			res.status(400).json({ message: "Validation Failed" });
		});
});

router.get("/:categoryId", (req, res) => {
	const { categoryId } = req.params;
	Category.findById({ _id: categoryId })
		.populate("products")
		.exec()
		.then((data) => {
			res.json({ data: data });
		})
		.catch((error) => {
			console.error(error);
		});
});

module.exports = router;
