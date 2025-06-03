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
							id: true,
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
			lastMessage: true,
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

const sendFriendReqService = async (userId, friendId) => {
	const exists = await prisma.user.findUnique({
		where: {
			id: userId,
		},
	});
	if (!exists) {
		throw Error("This user has not existed!");
	}
	// const reqExist = await prisma.friendRequest.findUnique({
	// 	where: {
	// 		friendId: friendId,
	// 		userId: userId,
	// 	},
	// });
	// if (reqExist) {
	// 	throw Error("This request has been sent");
	// }
	// const friendReq = await prisma.friendRequest.create({
	// 	data: {
	// 		friend: {

	// 		}
	// 	}
	// });
	const existingFriendReq = await prisma.friendRequest.findFirst({
		where: {
			userId: userId,
			friendId: friendId,
		},
	});
	if (existingFriendReq) {
		throw Error("You has sent this request");
	}
	const friendReq = await prisma.friendRequest.create({
		data: {
			user: {
				connect: {
					id: userId,
				},
			},
			friend: {
				connect: {
					id: friendId,
				},
			},
		},
	});
	// console.log(friendReq);
	return friendReq;
};

const getPeopleList = async (userId) => {
	const user = await prisma.user.findFirst({
		where: {
			id: userId,
		},
	});
	if (!user) {
		throw Error("This user has not existed!");
	}
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
							id: true,
						},
					},
				},
			},
		},
	});
	// lấy danh sách user id mà không có mình, vd id là 123 và members là [123, 321] [123,456] => [321, 456]
	// console.log(memberList);
	const userIdList = memberList.map((member) =>
		member.members.map((user) => user.userId)
	);
	const notIncludeUserId = userIdList.flat().filter((id) => id !== userId);
	// const notIncludeUserId = userIdList.filter((member) =>
	// 	member.filter((user) => user.userId !== userId).map((lst) => lst.userId)
	// );
	// console.log(notIncludeUserId);
	// const notIncludeUserId = user.members.map((member) => member.userId);
	// .filter((id) => id !== userId);
	// console.log(notIncludeUserId);

	// Lấy danh sách không có trong notIncludeUserId
	const userList = await prisma.user.findMany({
		where: {
			id: {
				notIn: [userId, ...notIncludeUserId],
			},
		},
		select: {
			id: true,
			username: true,
			avatarUrl: true,
		},
	});
	return userList;
};

const getFriendRequests = async (userId) => {
	const user = await prisma.user.findUnique({
		where: {
			id: userId,
		},
		include: {
			receiveRequest: {
				include: {
					user: {
						select: {
							id: true,
							username: true,
							createdAt: true,
						},
					},
				},
			},
		},
	});
	if (!user) {
		throw Error("User has not existed");
	}
	console.log(user);
	return user.receiveRequest;
};
module.exports = {
	getMemberList,
	addMember,
	sendFriendReqService,
	getPeopleList,
	getFriendRequests,
};
