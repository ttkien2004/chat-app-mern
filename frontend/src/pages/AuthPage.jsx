import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Message } from "primereact/message";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
	const [login, setLogin] = useState(true);
	const navigate = useNavigate();
	const handleAuth = () => {
		setLogin(!login);
	};
	const handleBack = () => {
		navigate("/");
	};
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				minHeight: "100vh",
			}}
		>
			<Card
				style={{
					height: "650px",
					width: "500px",
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
				}}
			>
				<h1 style={{ textAlign: "center" }}>
					{login ? "Đăng nhập" : "Đăng ký"}
				</h1>
				<form>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							marginTop: "10px",
							marginBottom: "10px",
						}}
					>
						<label style={{ fontSize: "25px" }} htmlFor="username">
							Username
						</label>
						<InputText
							id="username"
							type="text"
							style={{ marginTop: "15px" }}
						></InputText>
						{/* <Message severity="error" text="Useranme is required"></Message> */}
					</div>

					<div
						style={{
							display: "flex",
							flexDirection: "column",
							marginTop: "10px",
							marginBottom: "10px",
						}}
					>
						<label style={{ fontSize: "25px" }} htmlFor="password">
							Password
						</label>
						<InputText
							id="password"
							type="password"
							style={{ marginTop: "15px" }}
						></InputText>
					</div>
					<div style={{ marginTop: "50px" }}>
						<Button
							style={{
								width: "100%",
								display: "flex",
								justifyContent: "center",
							}}
						>
							{login ? "Đăng nhập" : "Đăng ký"}
						</Button>
						<div
							style={{ marginTop: "20px", cursor: "pointer" }}
							onClick={handleAuth}
						>
							{login
								? "Chưa có tài khoản? Đăng ký"
								: "Đã có tài khoản? Đăng nhập"}
						</div>
						<div
							style={{ marginTop: "20px", cursor: "pointer" }}
							onClick={handleBack}
						>
							Trở về trang chủ
						</div>
					</div>
				</form>
			</Card>
		</div>
	);
};

export default AuthPage;
