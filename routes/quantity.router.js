const express = require("express");
const router = express.Router();
const { updateQuantityInCart } = require("../controllers/quantity.controller");

router.route("/").put(updateQuantityInCart);

module.exports = router;
