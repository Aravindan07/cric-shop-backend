const Wishlist = require("../model/wishlist.model");

const getWishlist = async (req, res) => {
	try {
		const wishlist = await Wishlist.find({}).populate("product").select("-__v");
		res.status(200).json({ items: wishlist });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "An error occurred while fetching data" });
	}
};

const addItemToWishlist = async (req, res, next) => {
	const { product } = req.body;
	try {
		const addItemToWishlist = new Wishlist({ product });
		const savedItem = await (await addItemToWishlist.save()).populate("product").execPopulate();
		res.status(201).json({ message: "Item Added to Wishlist", item: savedItem });
	} catch (error) {
		next(error);
	}
};

const removeItemFromWishlist = async (req, res, next) => {
	const { id } = req.body;
	try {
		const item = await Wishlist.findById(id);
		await item.remove();
		res.status(201).json({ message: "Item Removed from Wishlist", item });
	} catch (error) {
		next(error);
	}
};

module.exports = { getWishlist, addItemToWishlist, removeItemFromWishlist };
