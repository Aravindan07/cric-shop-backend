const Category = require("../model/categories.model");

const getAllCategories = async (req, res) => {
	try {
		const categories = await Category.find({}).populate("products").select("-__v");
		res.status(200).json({ categories });
	} catch (error) {
		console.error(error);
		res.json({ message: "Some error occurred!" });
	}
};

const addCategory = async (req, res) => {
	const category = req.body;
	const newCategory = new Category(category);
	try {
		const saveCategory = await newCategory.save();
		res.status(201).json({ category: saveCategory });
	} catch (error) {
		console.error(error);
		res.status(400).json({ message: "Validation Failed" });
	}
};

const getCategoryById = async (req, res, next) => {
	const { categoryId } = req.params;
	try {
		const categoryById = await Category.findById({ _id: categoryId })
			.populate("products")
			.select("-__v")
			.exec();
		res.status(200).json({ data: categoryById });
	} catch (error) {
		next(error);
	}
};

module.exports = { getAllCategories, addCategory, getCategoryById };
