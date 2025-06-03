const {
	getMemberList,
	addMember,
	sendFriendReqService,
	getPeopleList,
	getFriendRequests,
} = require("../services/chatService");

const getMemberListController = async (req, res) => {
	const { userId } = req.query;
	try {
		const response = await getMemberList(userId);
		if (response) {
			res.status(200).json({ data: response });
		}
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

const addMemberController = async (req, res) => {
	const { memberId, userId } = req.body;
	try {
		const response = await addMember(memberId, userId);
		if (response) {
			res.status(201).json({ data: response });
		}
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

const sendFriendReqController = async (req, res) => {
	const { userId, friendId } = req.body;
	try {
		const response = await sendFriendReqService(userId, friendId);
		res.status(201).json({ data: "Send friend request successfully" });
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

const getPeopleListController = async (req, res) => {
	const { userId } = req.query;
	try {
		const response = await getPeopleList(userId);
		res.status(200).json({ data: response });
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

const getFriendRequestsController = async (req, res) => {
	const { userId } = req.query;
	try {
		const response = await getFriendRequests(userId);
		res.status(200).json({ data: response });
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};
module.exports = {
	getMemberListController,
	addMemberController,
	sendFriendReqController,
	getPeopleListController,
	getFriendRequestsController,
};
