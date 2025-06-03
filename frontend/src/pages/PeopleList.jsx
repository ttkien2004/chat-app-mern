import { Button } from "primereact/button";
import authApi from "../services/AuthService";
import chatApi from "../services/ChatService";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const PeopleList = ({ userId }) => {
	const list = [
		{
			name: "kien",
		},
		{
			name: "Tran",
		},
		{
			name: "trunes",
		},
	];
	const [peopleList, setPeopleList] = useState([]);
	useEffect(() => {
		chatApi
			.getPeopleList(userId)
			.then((res) => {
				setPeopleList(res.data);
			})
			.catch((err) => {
				console.log(err.error);
			});
	}, []);
	const handleSendFriendReq = async (friendId) => {
		try {
			await chatApi.sendFriendRequest(userId, friendId);

			setPeopleList((prev) => {
				const newList = prev.filter((user) => user.id !== friendId);
				return newList;
			});
		} catch (err) {
			toast.error("Failed to send request!");
		}
	};
	return (
		<div>
			<div style={{ fontSize: "30px", marginBottom: "30px" }}>
				Other friends
			</div>
			<div>
				{peopleList.map((member, i) => (
					<div
						key={i}
						style={{
							display: "flex",
							justifyContent: "space-between",
							marginBottom: "10px",
						}}
					>
						<div style={{ display: "flex", alignItems: "center" }}>
							<div
								style={{
									height: "40px",
									width: "40px",
									borderRadius: "50%",
									border: "1px solid red",
									marginRight: "10px",
								}}
							></div>
							<div>{member.username}</div>
						</div>
						<div>
							<Button
								label="Add friend"
								onClick={() => handleSendFriendReq(member.id)}
							></Button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default PeopleList;
