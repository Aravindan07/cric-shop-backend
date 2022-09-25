const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");
const shortid = require("shortid");

var instance = new Razorpay({
	key_id: process.env.KEY_ID,
	key_secret: process.env.KEY_SECRET,
});

router.post("/", async (req, res) => {
	const { amount, currency } = req.body;
	const payment_capture = 1;
	const options = {
		amount: amount * 100,
		currency,
		receipt: shortid.generate(),
		payment_capture,
	};

	try {
		const response = await instance.orders.create(options);
		res.json({
			id: response.id,
			currency: response.currency,
			amount: response.amount,
		});
	} catch (error) {
		console.log(error);
	}
});

module.exports = router;
