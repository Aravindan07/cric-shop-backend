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
	const sentData = req.body;
	const newProduct = new Product({
		name: sentData.name,
		price: sentData.price,
		image: sentData.image,
		description: sentData.description,
		ratings: sentData.ratings,
		delivery: sentData.delivery,
		offer: sentData.offer,
		inStock: sentData.inStock,
	});
	newProduct
		.save()
		.then((result) => {
			res.json({ product: result });
		})
		.catch(() => res.status(403).json({ message: "You made some error XD" }));
});

module.exports = router;
