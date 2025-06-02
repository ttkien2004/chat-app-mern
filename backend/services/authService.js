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
	await prisma.user.update({
		data: {
			isOnline: true,
		},
		where: {
			id: exists.id,
		},
	});
	if (!match) {
		throw Error("Password is not correct!");
	}
	return { token, username, id: exists.id, isOnline: true };
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
	// console.log(user);
	return user;
};

const logoutService = async (userId) => {
	const exists = await prisma.user.findUnique({
		where: {
			id: userId,
		},
	});
	if (!userId) {
		throw Error("THis user has not existed");
	}
	await prisma.user.update({
		data: {
			isOnline: false,
		},
		where: {
			id: userId,
		},
	});

	return { message: "Logout sucessfully" };
};

module.exports = {
	loginService,
	signupService,
	logoutService,
};
