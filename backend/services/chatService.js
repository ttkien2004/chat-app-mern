const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getMemberList = async (userId) => {
	const memberList = await prisma.conversation.findMany({
		where: {
			members: {
				some: {
					userId,
				},
			},
		},
		include: {
			members: {
				include: {
					user: {
						select: {
							username: true,
						},
					},
				},
			},
			messages: {
				select: {
					senderId: true,
					text: true,
				},
			},
		},
	});
	if (!memberList) {
		throw Error("Not found any members");
	}
	return memberList;
};

const addMember = async (memberId, userId) => {
	const conversation = await prisma.conversation.create({
		data: {
			isGroup: false,
			members: {
				create: [
					{
						user: {
							connect: {
								id: memberId,
							},
						},
					},
					{
						user: {
							connect: {
								id: userId,
							},
						},
					},
				],
			},
		},
		include: {
			members: true,
		},
	});

	if (!conversation) {
		throw Error("Cannot create new conversation");
	}
	return conversation;
};

module.exports = {
	getMemberList,
	addMember,
};
