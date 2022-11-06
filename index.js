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
const paymentRoutes = require("./routes/payment.router");
const userRoutes = require("./routes/user.router");

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + "/public"));

connectDB();

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/products", products);
app.use("/api/v1/users", wishList);
app.use("/api/v1/users", cartList);
app.use("/api/v1/categories", categoryList);
app.use("/api/v1/users/:userId/cartlist/:cartId/quantity", quantityUpdater);
app.use("/api/v1/payment", paymentRoutes);

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "An error occurred, see the errorMessage key for more details",
    errorMessage: err.message,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server started on ${process.env.NODE_ENV} mode on port ${PORT}`)
);
