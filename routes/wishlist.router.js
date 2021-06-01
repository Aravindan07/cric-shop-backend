const express = require("express");
const router = express.Router();
const {
	getWishlist,
	addItemToWishlist,
	removeItemFromWishlist,
} = require("../controllers/wishlist.controller");
const checkAuth = require("../middlewares/checkAuth");

router.route("/:userId/wishlist").all(checkAuth).get(getWishlist);

router.route("/:userId/wishlist").all(checkAuth).post(addItemToWishlist);

router.route("/:userId/wishlist/remove").all(checkAuth).put(removeItemFromWishlist);

module.exports = router;
