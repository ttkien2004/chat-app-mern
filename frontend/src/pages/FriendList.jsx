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
						{friendList.map((memberList, index) => {
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
