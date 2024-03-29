const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartListSchema = new Schema(
	{
		userId: { type: Schema.Types.ObjectId, ref: "User" },
		products: [
			{
				product: { type: Schema.Types.ObjectId, ref: "Product" },
				quantity: { type: Number, default: 1 },
			},
		],
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Cartlist", cartListSchema);
