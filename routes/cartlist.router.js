const express = require("express");
const router = express.Router();
const {
	getCartlist,
	addItemToCartlist,
	removeFromCartlist,
} = require("../controllers/cartlist.controller");

router.route("/").get(getCartlist);

router.route("/:productId").post(addItemToCartlist);

router.route("/:cartId/remove").put(removeFromCartlist);

module.exports = router;
