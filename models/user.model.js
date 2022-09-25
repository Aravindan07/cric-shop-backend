const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
	name: { type: String, required: [true, "Name is required"] },
	email: { type: String, required: [true, "Email Id is required"], unique: true },
	password: { type: String, required: [true, "Password is required"] },
	cart: { type: Schema.Types.ObjectId, ref: "Cartlist" },
	wishList: { type: Schema.Types.ObjectId, ref: "Wishlist" },
});

module.exports = mongoose.model("User", userSchema);
