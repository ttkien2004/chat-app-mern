const express = require("express");
const routes = express.Router();
const {
	loginController,
	signupController,
	logoutController,
} = require("../controllers/authController");

routes.post("/login", loginController);
routes.post("/signup", signupController);
routes.post("/logout", logoutController);

module.exports = routes;
