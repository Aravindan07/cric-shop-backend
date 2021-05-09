const Product = require("../model/products.model");

const getAllProducts = async (req, res) => {
	try {
		const products = await Product.find({}).select("-__v");
		res.status(200).json({ products });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "An error occurred While fetching data" });
	}
};

const postProduct = async (req, res) => {
	const receivedData = req.body;
	try {
		const newProduct = new Product({ ...receivedData });
		const addedProduct = await newProduct.save();
		res.status(201).json({ product: addedProduct });
	} catch (error) {
		console.error(error);
		res.status(400).json({ message: "Validation Failed!" });
	}
};

module.exports = { getAllProducts, postProduct };
