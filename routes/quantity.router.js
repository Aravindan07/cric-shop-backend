const express = require("express");
const router = express.Router();
const Product = require("../model/products.model");

router.put("", async (req, res) => {
	const queryParams = req.query.type;
	const { productId } = req.body;
	const query = { _id: productId };
	const foundProduct = await Product.findById(productId);
	const quantityDecider = () => {
		if (queryParams === "increment") {
			return foundProduct.quantityAddedToCart + 1;
		}
		return foundProduct.quantityAddedToCart - 1;
	};
	const update = {
		$set: {
			quantityAddedToCart: quantityDecider(),
		},
	};
	const options = { new: true };
	Product.findOneAndUpdate(query, update, options)
		.then((updatedData) => {
			if (updatedData) {
				return res
					.status(200)
					.json({ message: "Quantity updated Successfully", item: updatedData });
			}
			return res.status(404).json({ message: "Product quantity didn't get updated" });
		})
		.catch((error) => {
			console.error(error);
			res.json({ error: error });
		});
});

module.exports = router;
