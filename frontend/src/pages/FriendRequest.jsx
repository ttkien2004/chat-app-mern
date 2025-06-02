import { Button } from "primereact/button";

const FriendRequest = () => {
	return (
		<div>
			<div style={{ fontSize: "30px", marginBottom: "30px" }}>
				Friend Requests
			</div>
			<div
				className="friend-request-list"
				style={{ display: "flex", justifyContent: "space-between" }}
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
						<div>Kien Tran</div>
						<div>28/11/2024</div>
					</div>
				</div>
				<div>
					<Button
						icon="pi pi-check"
						rounded
						outlined
						style={{ marginRight: "10px" }}
					/>
					<Button icon="pi pi-times" rounded outlined severity="danger" />
				</div>
			</div>
		</div>
	);
};
export default FriendRequest;
