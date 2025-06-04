import { useState, useMemo, useEffect } from "react";

const FriendList = ({
	friendList,
	user,
	select,
	setSelect,
	conversationId,
	setConversationId,
	setConversationName,
	messages,
	setMessages,
	allMessages,
	checkUserOnline,
}) => {
	const [prevFriendId, setPrevFriendId] = useState("");
	const [filteredMemberList, setFilteredMemberList] = useState([]);
	useEffect(() => {
		if (user && friendList) {
			// const newMemberList = useMemo(() => {
			// 	let seenIds = new Set();
			// 	return friendList.map((list) => {
			// 		const filteredMembers = list.members.filter((mem) => {
			// 			if (mem.userId !== user.id && !seenIds.has(mem.userId)) {
			// 				seenIds.add(mem.userId);
			// 				return true;
			// 			}
			// 			return false;
			// 		});

			// 		return {
			// 			...list,
			// 			members: filteredMembers,
			// 		};
			// 	});
			// }, [friendList, user.id]);
			// setFilteredMemberList(newMemberList);
			let newMemberList = [];
			let prevId = "";
			for (let i = 0; i < friendList.length; ++i) {
				let inserted = false;
				// console.log(friendList[i]);
				let membersTemp = friendList[i].members;
				for (let j = 0; j < membersTemp.length; ++j) {
					if (
						membersTemp[j].userId !== prevId &&
						membersTemp[j].userId !== user.id
					) {
						// setPrevFriendId(membersTemp[j].userId);
						prevId = membersTemp[j].userId;
						inserted = true;
					}
				}
				if (inserted) {
					newMemberList.push(friendList[i]);
				}
			}
			// console.log(newMemberList, "hello");
			setFilteredMemberList(newMemberList);
		}
	}, [user, friendList]);

	// console.log(friendList);
	// console.log(filteredMemberList);
	return (
		<>
			{user && (
				<>
					<div
						className="friend-list-header"
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
						}}
					>
						<div style={{ fontSize: "35px" }}>Chats</div>
						<div style={{ display: "flex" }}>
							<i
								className="pi pi-camera"
								style={{ fontSize: "30px", marginRight: "20px" }}
							></i>
							<i className="pi pi-expand" style={{ fontSize: "30px" }}></i>
						</div>
					</div>
					<div
						className="search-input"
						style={{
							borderRadius: "20px",
							display: "flex",
							alignItems: "center",
							marginTop: "30px",
							marginBottom: "80px",
							backgroundColor: "#B2C6D5",
							height: "40px",
							paddingLeft: "20px",
						}}
					>
						<div>
							<i className="pi pi-comments"></i>
						</div>
						<div style={{ marginLeft: "20px" }}>Search Message...</div>
					</div>
					<div className="chat-list">
						{filteredMemberList.map((memberList, index) => {
							return memberList.members.map(
								(member, i) =>
									member.userId !== user.id && (
										<div
											className="friend"
											style={
												select === index ? { backgroundColor: "#4e71ff" } : {}
											}
											key={i}
											onClick={() => {
												setSelect(index);
												setConversationId(memberList.id);
												if (conversationId !== memberList.id) {
													setMessages(allMessages[memberList.id]);
												}

												setConversationName(member.user.username);
												checkUserOnline(member.user.id);
											}}
										>
											<div>
												<i
													className="pi pi-user"
													style={{ fontSize: "25px" }}
												></i>
											</div>
											<div
												style={{
													display: "flex",
													flexDirection: "column",
													justifyContent: "space-between",
													height: "100%",
													marginLeft: "20px",
												}}
											>
												<div style={{ color: "black", fontWeight: "bold" }}>
													{member.user.username}
												</div>
												{/* Hiển thị last message */}
												<div
													className="message"
													style={{ color: "rgb(180,180,180)" }}
												>
													{memberList.lastMessage &&
														memberList.lastMessage.text}
												</div>
											</div>
										</div>
									)
							);
						})}
					</div>
				</>
			)}
		</>
	);
};

export default FriendList;
