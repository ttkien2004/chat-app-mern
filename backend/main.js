const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/AuthRoutes");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

const port = process.env.PORT || 5000;
mongoose
	.connect(process.env.DATABASE_URL)
	.then(() => {
		app.listen(port, () => {
			console.log(`Listening to port ${port}`);
		});
	})
	.catch((err) => {
		console.error(err.message);
	});
