const Cartlist = require("../model/cart.model");

const updateQuantityInCart = async (req, res, next) => {
	const { id } = req.body;
	const queryParams = req.query.type;
	try {
		const updateQuantity = await Cartlist.findById(id).select("-__v");
		if (queryParams === "increment") {
			updateQuantity.quantity = updateQuantity.quantity + 1;
			const updatedQuantity = await updateQuantity.save();
			return res
				.status(201)
				.json({ message: "Quantity updated Successfully", item: updatedQuantity });
		}
		updateQuantity.quantity = updateQuantity.quantity - 1;
		const updatedQuantity = await updateQuantity.save();
		return res
			.status(201)
			.json({ message: "Quantity updated Successfully", item: updatedQuantity });
	} catch (error) {
		next(error);
	}
};

module.exports = { updateQuantityInCart };
