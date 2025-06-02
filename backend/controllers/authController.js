const {
	loginService,
	signupService,
	logoutService,
} = require("../services/authService");

const loginController = async (req, res) => {
	const { username, password } = req.body;
	try {
		const response = await loginService(username, password);
		res.status(200).json({ data: response });
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};
const signupController = async (req, res) => {
	const { username, password } = req.body;
	try {
		await signupService(username, password);

		res.status(201).json({ message: "Sign up success fully" });
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};
const logoutController = async (req, res) => {
	const { userId } = req.body;
	try {
		await logoutService(userId);

		res.status(200).json({ message: "Logout successfully" });
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

module.exports = {
	loginController,
	signupController,
	logoutController,
};
