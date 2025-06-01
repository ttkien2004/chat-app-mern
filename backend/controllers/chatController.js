const { getMemberList, addMember } = require("../services/chatService");

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
module.exports = {
	getMemberListController,
	addMemberController,
};
