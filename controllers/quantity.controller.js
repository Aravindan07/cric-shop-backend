const Cartlist = require("../models/cart.model");

const updateQuantityInCart = async (req, res, next) => {
	const { cartId, productsId } = req.body;
	const queryParams = req.query.type;
	try {
		const updateQuantity = await Cartlist.findById(cartId).select("-__v");
		if (queryParams === "increment") {
			updateQuantity.products.map((item) =>
				String(item._id) === String(productsId) ? (item.quantity = item.quantity + 1) : item
			);
			const updatedQuantity = await (await updateQuantity.save())
				.populate("products.product")
				.execPopulate();
			return res
				.status(201)
				.json({ message: "Quantity updated Successfully", item: updatedQuantity });
		}
		updateQuantity.products.map((item) =>
			String(item._id) === String(productsId) ? (item.quantity = item.quantity - 1) : item
		);
		const updatedQuantity = await (await updateQuantity.save())
			.populate("products.product")
			.execPopulate();
		return res
			.status(201)
			.json({ message: "Quantity updated Successfully", item: updatedQuantity });
	} catch (error) {
		next(error);
	}
};

module.exports = { updateQuantityInCart };
