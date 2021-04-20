const express = require("express");
const router = express.Router();
const Product = require("../model/products.model");

router.get("/", (req, res) => {
	Product.find({})
		.select("-__v")
		.then((data) => res.json({ products: data }))
		.catch(() => res.status(500).json({ message: "An Error Occurred" }));
});

router.post("/", (req, res) => {
	const receivedData = req.body;
	const newProduct = new Product({
		brand: receivedData.brand,
		name: receivedData.name,
		modelNo: receivedData.modelNo,
		price: receivedData.price,
		imageUrl: receivedData.imageUrl,
		description: receivedData.description,
		ratings: receivedData.ratings,
		delivery: receivedData.delivery,
		offer: receivedData.offer,
		inStock: receivedData.inStock,
		category: receivedData.category,
	});
	newProduct
		.save()
		.then((result) => {
			res.status(201).json({ product: result });
		})
		.catch((error) => {
			console.error(error);
			res.status(400).json({ message: "Validation Failed!" });
		});
});

module.exports = router;
