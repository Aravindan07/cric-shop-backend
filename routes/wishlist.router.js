const express = require("express");
const router = express.Router();
const Product = require("../model/products.model");

router.get("/", (req, res) => {
	Product.find({ wishListed: true })
		.select("-__v")
		.then((data) => res.json({ items: data }))
		.catch((error) => console.error(error));
});

router.post("/:productId", async (req, res) => {
	const { productId } = req.body;
	const foundProduct = await Product.findById(productId);
	console.log(foundProduct);
	const query = { _id: productId };
	const update = {
		$set: {
			wishListed: !foundProduct.wishListed,
		},
	};
	const options = { new: true };
	Product.findOneAndUpdate(query, update, options)
		.select("-__v")
		.then((updatedDocument) => {
			if (updatedDocument) {
				return res.status(201).json(updatedDocument);
			} else {
				return res.status(404).json({ message: "An Error Occurred!" });
			}
		})
		.catch((error) => console.error(error));
});

module.exports = router;
