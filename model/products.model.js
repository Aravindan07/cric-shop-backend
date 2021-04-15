const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
	name: String,
	price: Number,
	image: String,
	description: String,
	ratings: String,
	delivery: String,
	offer: String,
	inStock: { type: Boolean },
	cartListed: { type: Boolean, default: false },
	wishListed: { type: Boolean, default: false },
});

module.exports = mongoose.model("Product", productSchema);
