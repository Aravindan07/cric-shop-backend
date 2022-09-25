const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema(
	{
		categoryName: { type: String, required: true, unique: [true, "Category must be unique"] },
		products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
