const Wishlist = require("../models/wishlist.model");
const User = require("../models/user.model");

const getWishlist = async (req, res) => {
	const { userId } = req.params;
	try {
		const wishlist = await Wishlist.findOne({ userId }).populate("products").select("-__v");
		res.status(200).json({ items: wishlist });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "An error occurred while fetching data" });
	}
};

const addItemToWishlist = async (req, res, next) => {
	const { userId, product } = req.body;
	const foundUserWishlist = await Wishlist.findOne({ userId });
	const foundUserData = await User.findById(userId);
	try {
		if (foundUserWishlist) {
			foundUserWishlist.products.push(product);
			const newList = await (await foundUserWishlist.save())
				.populate("products")
				.execPopulate();
			return res.status(201).json({ message: "Item Added to Wishlist", item: newList });
		}
		const addItemToWishlist = new Wishlist({ userId, products: [product] });
		foundUserData.wishList = addItemToWishlist;
		await foundUserData.save();
		const savedItem = await (await addItemToWishlist.save())
			.populate("products")
			.execPopulate();
		res.status(201).json({ message: "Item Added to Wishlist", item: savedItem });
	} catch (error) {
		next(error);
	}
};

const removeItemFromWishlist = async (req, res, next) => {
	const { userId, productId } = req.body;
	try {
		const item = await Wishlist.findOne({ userId });
		item.products = item.products.filter((product) => String(product) !== String(productId));
		const newList = await (await item.save()).populate("products").execPopulate();
		res.status(201).json({ message: "Item Removed from Wishlist", item: newList });
	} catch (error) {
		next(error);
	}
};

module.exports = { getWishlist, addItemToWishlist, removeItemFromWishlist };
