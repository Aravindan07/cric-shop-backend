const express = require("express");
const router = express.Router();
const { updateQuantityInCart } = require("../controllers/quantity.controller");
const checkAuth = require("../middlewares/checkAuth");

router.route("/").all(checkAuth).put(updateQuantityInCart);

module.exports = router;
