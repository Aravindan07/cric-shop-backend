const mongoose = require("mongoose");
const { Schema } = mongoose;
require("mongoose-type-url");

const productSchema = new Schema(
	{
		brand: { type: String, required: true },
		name: { type: String, required: true },
		modelNo: { type: String, required: true, unique: true },
		price: { type: Number, required: true },
		imageUrl: { type: mongoose.SchemaTypes.Url, required: true },
		description: {
			type: String,
			minLength: [100, "Min length should be 100 characters"],
			required: true,
		},
		ratings: { type: String, required: true },
		delivery: { type: String, required: true },
		offer: { type: String, required: true },
		inStock: { type: Boolean, required: true },
		category: { type: Schema.Types.ObjectId, ref: "Category" },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
