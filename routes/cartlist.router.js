const express = require("express");
const router = express.Router();
const {
	getCartlist,
	addItemToCartlist,
	removeFromCartlist,
} = require("../controllers/cartlist.controller");
const checkAuth = require("../middlewares/checkAuth");

router.route("/:userId/cartlist").all(checkAuth).get(getCartlist);

router.route("/:userId/cartlist").all(checkAuth).post(addItemToCartlist);

router.route("/:userId/cartlist/remove").all(checkAuth).put(removeFromCartlist);

module.exports = router;
