const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const wishListSchema = new Schema({
	userId: { type: Schema.Types.ObjectId, ref: "User" },
	products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
});

module.exports = mongoose.model("Wishlist", wishListSchema);
