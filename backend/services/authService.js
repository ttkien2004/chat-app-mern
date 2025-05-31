const bcrypt = require("bcrypt");
const validator = require("validator");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");

const createToken = (username) => {
	return jwt.sign({ username }, process.env.SECRET, { expiresIn: "3d" });
};

const loginService = async (username, password) => {
	const exists = await prisma.user.findUnique({
		where: {
			username: username,
		},
	});
	if (!exists) {
		throw Error("Username does not Exist!");
	}

	const token = createToken(username);

	const match = await bcrypt.compare(password, exists.password);
	if (!match) {
		throw Error("Password is not correct!");
	}

	return token;
};
const signupService = async (username, password) => {
	const exists = await prisma.user.findUnique({
		where: {
			username: username,
		},
	});

	if (exists) {
		throw Error("Username has existed!");
	}
	const salt = await bcrypt.genSalt(10);
	const hash = await bcrypt.hash(password, salt);

	const user = await prisma.user.create({
		data: {
			username: username,
			password: hash,
		},
	});
	console.log(user);
	return user;
};

module.exports = {
	loginService,
	signupService,
};
