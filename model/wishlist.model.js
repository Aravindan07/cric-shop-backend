const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const wishListSchema = new Schema({
	product: { type: Schema.Types.ObjectId, ref: "Product" },
});

module.exports = mongoose.model("Wishlist", wishListSchema);
