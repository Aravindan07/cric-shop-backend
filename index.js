const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const products = require("./routes/products.router");
const connectDB = require("./db/db.connection");

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/v1/products", products);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
	console.log(`Server started on ${process.env.NODE_ENV} mode on port ${PORT}`)
);
