const express = require("express");
const router = express.Router();
const Product = require("../model/products.model");

router.get("/", (req, res) => {
	Product.find({ cartListed: true })
		.select("-__v")
		.then((data) => res.json({ items: data }))
		.catch((error) => console.error(error));
});

router.post("/:productId", async (req, res) => {
	const { productId } = req.body;
	const query = { _id: productId };
	const foundProduct = await Product.findById(productId);
	const update = {
		$set: {
			cartListed: !foundProduct.cartListed,
			quantityAddedToCart: 1,
		},
	};
	const options = { new: true };
	Product.findOneAndUpdate(query, update, options)
		.then((updatedDocument) => {
			if (updatedDocument) {
				return res
					.status(201)
					.json({
						message: foundProduct.cartListed
							? "Product removed from Cartlist"
							: "Product Added to Cartlist",
						item: updatedDocument,
					});
			}
			return res.status(404).json({ message: "An Error Occurred!" });
		})
		.catch((error) => {
			console.error(error);
			res.status(500).json({ message: "Server Error Occurred!" });
		});
});

module.exports = router;
