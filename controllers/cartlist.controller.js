const Cartlist = require("../model/cart.model");

const getCartlist = async (req, res, next) => {
	try {
		const cartItems = await Cartlist.find({}).populate("product").select("-__v");
		res.status(200).json({ items: cartItems });
	} catch (error) {
		next(error);
	}
};

const addItemToCartlist = async (req, res, next) => {
	const { product } = req.body;
	try {
		const addItemToCartlist = new Cartlist({ product });
		const savedItem = await addItemToCartlist.save();
		res.status(201).json({ message: "Item Added to Cartlist", item: savedItem });
	} catch (error) {
		next(error);
	}
};

const removeFromCartlist = async (req, res, next) => {
	const { id } = req.body;
	try {
		const item = await Cartlist.findById(id);
		await item.remove();
		res.status(201).json({ message: "Item Removed from Cartlist" });
	} catch (error) {
		next(error);
	}
};

module.exports = { getCartlist, addItemToCartlist, removeFromCartlist };
