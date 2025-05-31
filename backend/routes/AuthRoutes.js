const express = require("express");
const routes = express.Router();
const {
	loginController,
	signupController,
} = require("../controllers/authController");

routes.post("/login", loginController);
routes.post("/signup", signupController);

module.exports = routes;
