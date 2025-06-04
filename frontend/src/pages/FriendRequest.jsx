import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import chatApi from "../services/ChatService";
import moment from "moment";
import { toast } from "react-toastify";

const FriendRequest = ({ userId }) => {
	const [friendRequests, setFriendRequests] = useState([]);
	useEffect(() => {
		chatApi
			.getFriendRequests(userId)
			.then((res) => {
				setFriendRequests(res.data);
				console.log(res.data);
			})
			.catch((err) => {
				console.log("cannot get friend reqs");
			});
	}, []);
	const handleAcceptReq = async (userId, friendId) => {
		try {
			await chatApi.addMember(userId, friendId);
			setTimeout(() => {
				toast.success("Accept successfully!");
				setFriendRequests((prev) => {
					let newFriendReq = prev.filter((req) => req.id !== friendId);
					return newFriendReq;
				});
			}, 2000);
		} catch (err) {
			console.log(err.error);
		}
	};
	return (
		<div>
			<div style={{ fontSize: "30px", marginBottom: "30px" }}>
				Friend Requests
			</div>
			{friendRequests.length !== 0 ? (
				friendRequests.map((req, i) => (
					<div
						className="friend-request-list"
						style={{ display: "flex", justifyContent: "space-between" }}
						key={i}
					>
						<div style={{ display: "flex", alignItems: "center" }}>
							<div
								style={{
									border: "1px solid red",
									width: "40px",
									height: "40px",
									borderRadius: "50%",
									marginRight: "10px",
								}}
							></div>
							<div>
								<div>{req.user.username}</div>
								<div>{moment(req.user.createdAt).format("DD-MM-YYYY")}</div>
							</div>
						</div>
						<div>
							<Button
								icon="pi pi-check"
								rounded
								outlined
								style={{ marginRight: "10px" }}
								onClick={() => handleAcceptReq(userId, req.userId)}
							/>
							<Button icon="pi pi-times" rounded outlined severity="danger" />
						</div>
					</div>
				))
			) : (
				<div style={{ fontSize: "20px" }}>You don't have any requests...</div>
			)}
		</div>
	);
};
export default FriendRequest;
