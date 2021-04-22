const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./db/db.connection");
const products = require("./routes/products.router");
const wishList = require("./routes/wishlist.router");
const cartList = require("./routes/cartlist.router");
const categoryList = require("./routes/categories.router");
const quantityUpdater = require("./routes/quantity.router");

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/v1/products", products);
app.use("/api/v1/wishlist", wishList);
app.use("/api/v1/cartlist", cartList);
app.use("/api/v1/categories", categoryList);
app.use("/api/v1/cartlist/:productId/quantity", quantityUpdater);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
	console.log(`Server started on ${process.env.NODE_ENV} mode on port ${PORT}`)
);
