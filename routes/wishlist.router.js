const express = require("express");
const router = express.Router();
const {
	getWishlist,
	addItemToWishlist,
	removeItemFromWishlist,
} = require("../controllers/wishlist.controller");

router.route("/").get(getWishlist);

router.route("/:productId").post(addItemToWishlist);

router.route("/:wishlistId/remove").put(removeItemFromWishlist);

module.exports = router;
