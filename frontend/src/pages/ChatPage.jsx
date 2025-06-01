import { InputText } from "primereact/inputtext";
import "./style.css";
import { useEffect, useState, useRef } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import socket from "../socket/socket";
import chatApi from "../services/ChatService";

const ChatPage = () => {
	const users = [
		{
			name: "Kien Chan",
			message: "How's your day?",
		},
		{
			name: "Kien Cen",
			message: "How's your day?",
		},
		{
			name: "Kien LOL",
			message: "How's your day?",
		},
	];
	const myID = "123";
	const { user } = useAuthContext();

	const messagesContainer = [
		[
			{
				senderId: myID,
				message: "Hi Kien Tran",
			},
			{
				senderId: "321",
				message: "Hello my friend",
			},
		],
		[
			{
				senderId: myID,
				message: "Hey bro!",
			},
		],
		[
			{
				senderId: "425",
				message: "Hello, are u Kien Tran?",
			},
		],
	];
	const chatRef = useRef();
	const [select, setSelect] = useState(0);
	const [myMessage, setMyMessage] = useState(""); // Gửi tin nhắn
	const [friendMessage, setFriendMessage] = useState(""); // Bạn gửi tin nhắn
	const [container, setContainer] = useState(messagesContainer);
	const [friendList, setFriendList] = useState([]);
	const [conversationId, setConversationId] = useState("");
	const [friendId, setFriendId] = useState("");
	const [conversationName, setConversationName] = useState(""); // Tên của conversation
	// const scrollToBottom = () => {

	// }

	const [messages, setMessages] = useState([]);

	const handleKeyDown = (e) => {
		if (e.key === "Enter") {
			// setMessages([
			// 	...messages,

			// ]);
			setMessages([
				...container[select],
				{
					senderId: myID,
					message: myMessage,
				},
			]);
			// const updatedMessages = [
			// 	...container[select],
			// 	{
			// 		senderId: myID,
			// 		message: myMessage,
			// 	},
			// ];
			container[select].push({
				senderId: myID,
				message: myMessage,
			});
			setContainer(container);
			setMyMessage("");
		}
	};

	useEffect(() => {
		const chat = chatRef.current;
		chat.scrollTop = chat.scrollHeight;
	}, [messages]);
	useEffect(() => {
		// let friendList = [];
		if (!user) return;
		chatApi
			.getUserList(user.id)
			.then((res) => {
				// console.log(res.data);
				setFriendList(res.data);
				// setMessages(res.data.messages);
				// setConversationId(res.data.id);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [user]);
	useEffect(() => {
		socket.on("connect", () => {
			console.log("COnnected to socket server:", socket.id);
		});

		socket.on("receive-message", (message) => {
			console.log("Message received: ", message);
		});
		return () => {
			socket.off("connect");
			socket.off("receive-message");
		};
	}, []);
	const sendMessage = (e) => {
		if (e.key === "Enter") {
			socket.emit("send-message", {
				senderId: user.id,
				text: myMessage,
				conversationId: conversationId,
			});
		}
	};
	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				minHeight: "100vh",
			}}
		>
			<div className="chat-app">
				<div
					className="sidebar"
					style={{
						width: "240px",
						paddingLeft: "20px",
						paddingRight: "20px",
					}}
				>
					<div style={{ fontSize: "35px" }}>😎 Demo</div>
					<div
						style={{
							height: "150px",
							display: "flex",
							flexDirection: "column",
							justifyContent: "space-between",
							marginTop: "160px",
						}}
					>
						<div>
							<i className="pi pi-comments" style={{ fontSize: "30px" }}>
								&nbsp;Chat
							</i>
						</div>
						<div>
							<i className="pi pi-users" style={{ fontSize: "30px" }}>
								&nbsp;People
							</i>
						</div>
						<div>
							<i className="pi pi-bell" style={{ fontSize: "30px" }}>
								&nbsp;Request
							</i>
						</div>
					</div>
				</div>
				<div className="friend-list">
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
						{friendList.map((memberList) => {
							return memberList.members.map(
								(member, i) =>
									member.userId !== user.id && (
										<div
											className="friend"
											style={select === i ? { backgroundColor: "#4e71ff" } : {}}
											key={i}
											onClick={() => {
												setSelect(i);
												setConversationId(memberList.id);
												// setMessages(messagesContainer[i]);
												setConversationName(member.user.username);
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
													{"Last message"}
												</div>
											</div>
										</div>
									)
							);
						})}
					</div>
				</div>
				<div className="chat-area">
					<div className="chat-header">
						<div
							style={{
								display: "flex",
								alignItems: "center",
								justifyContent: "space-between",
								paddingLeft: "20px",
								paddingRight: "20px",
							}}
						>
							<div style={{ display: "flex", alignItems: "center" }}>
								<i
									className="pi pi-user"
									style={{
										fontSize: "30px",
										border: "1px solid red",
										borderRadius: "50%",
										padding: "10px",
										marginRight: "10px",
									}}
								></i>
								<div style={{ fontSize: "30px" }}>{conversationName}</div>
							</div>
							<div style={{ display: "flex" }}>
								<i className="pi pi-phone chat-setting"></i>
								<i className="pi pi-camera chat-setting"></i>
								<i className="pi pi-info-circle chat-setting"></i>
							</div>
						</div>
					</div>
					<div className="chat-content" ref={chatRef}>
						{messages.map((mess, index) =>
							mess.senderId === myID ? (
								<div className="my-turn" key={index}>
									<div className="my-message">{mess.message}</div>
									<i className="pi pi-user chat-avatar"></i>
								</div>
							) : (
								<div className="friend-turn" key={index}>
									<i className="pi pi-user chat-avatar"></i>
									<div className="friend-message">{mess.message}</div>
								</div>
							)
						)}
					</div>
					<div className="chat-footer">
						<i className="pi pi-table"></i>
						<i className="pi pi-camera"></i>
						<i className="pi pi-image"></i>
						<i className="pi pi-microphone"></i>
						<InputText
							type="text"
							style={{ borderRadius: "20px" }}
							placeholder="Message..."
							value={myMessage}
							onChange={(e) => {
								setMyMessage(e.target.value);
							}}
							onKeyDown={sendMessage}
						></InputText>
						<i className="pi pi-face-smile"></i>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ChatPage;
