const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartListSchema = new Schema({
	product: { type: Schema.Types.ObjectId, ref: "Product" },
	quantity: { type: Number, default: 0 },
});

module.exports = mongoose.model("Cartlist", cartListSchema);
