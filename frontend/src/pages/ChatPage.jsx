import { InputText } from "primereact/inputtext";
import "./style.css";
import { useState } from "react";

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
	const [select, setSelect] = useState(0);
	return (
		<div>
			<div
				style={{
					width: "1200px",
					height: "800px",
					border: "1px solid red",
					borderRadius: "10px",
					display: "flex",
				}}
			>
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
						{users.map((user, i) => (
							<div
								className="friend"
								style={select === i ? { backgroundColor: "#4e71ff" } : {}}
								key={i}
								onClick={() => setSelect(i)}
							>
								<div>
									<i className="pi pi-user" style={{ fontSize: "25px" }}></i>
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
										{user.name}
									</div>
									<div
										className="message"
										style={{ color: "rgb(180,180,180)" }}
									>
										{user.message}
									</div>
								</div>
							</div>
						))}
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
								<div style={{ fontSize: "30px" }}>{users[select].name}</div>
							</div>
							<div style={{ display: "flex" }}>
								<i className="pi pi-phone chat-setting"></i>
								<i className="pi pi-camera chat-setting"></i>
								<i className="pi pi-info-circle chat-setting"></i>
							</div>
						</div>
					</div>
					<div className="chat-content"></div>
					<div className="chat-footer">
						<i className="pi pi-table"></i>
						<i className="pi pi-camera"></i>
						<i className="pi pi-image"></i>
						<i className="pi pi-microphone"></i>
						<InputText
							type="text"
							style={{ borderRadius: "20px" }}
							placeholder="Message..."
						></InputText>
						<i className="pi pi-face-smile"></i>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ChatPage;
