const { loginService, signupService } = require("../services/authService");

const loginController = async (req, res) => {
	const { username, password } = req.body;
	try {
		const token = await loginService(username, password);
		res.status(200).json({ token: token });
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};
const signupController = async (req, res) => {
	const { username, password } = req.body;
	try {
		const user = await signupService(username, password);

		res.status(201).json({ data: user.username });
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

module.exports = {
	loginController,
	signupController,
};
