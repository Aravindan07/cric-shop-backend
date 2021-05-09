const express = require("express");
const router = express.Router();
const { getAllProducts, postProduct } = require("../controllers/products.controller");

router.route("/").get(getAllProducts).post(postProduct);

module.exports = router;
