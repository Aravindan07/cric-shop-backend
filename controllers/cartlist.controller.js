const Cartlist = require("../models/cart.model");
const User = require("../models/user.model");

const getCartlist = async (req, res, next) => {
	const { userId } = req.params;
	try {
		const cartItems = await Cartlist.findOne({ userId })
			.select("-__v")
			.populate("products.product")
			.select("-__v");
		res.status(200).json({ items: cartItems });
	} catch (error) {
		next(error);
	}
};

const addItemToCartlist = async (req, res, next) => {
	const { userId, product } = req.body;
	const foundUserCart = await Cartlist.findOne({ userId });
	const foundUser = await User.findById(userId);
	try {
		if (foundUserCart) {
			foundUserCart.products.push({ product });
			const newList = await (await foundUserCart.save())
				.populate("products.product")
				.execPopulate();
			return res.status(201).json({ message: "Item Added to Cart", item: newList });
		}
		const addItemToCartlist = new Cartlist({ userId, products: [{ product }] });
		foundUser.cart = addItemToCartlist;
		await foundUser.save();
		const savedItem = await (await addItemToCartlist.save())
			.populate("products.product")
			.execPopulate();
		res.status(201).json({ message: "Item Added to Cart", item: savedItem });
	} catch (error) {
		next(error);
	}
};

const removeFromCartlist = async (req, res, next) => {
	const { userId, productsId } = req.body;
	try {
		const item = await Cartlist.findOne({ userId }).select("-__v");
		item.products = item.products.filter(
			(product) => String(product._id) !== String(productsId)
		);
		const newList = await (await item.save()).populate("products.product").execPopulate();
		res.status(201).json({ message: "Item Removed from Cart", item: newList });
	} catch (error) {
		next(error);
	}
};

module.exports = { getCartlist, addItemToCartlist, removeFromCartlist };
