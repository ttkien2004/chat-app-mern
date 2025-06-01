import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Message } from "primereact/message";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import useSignup from "../hooks/useSignup";
import { toast } from "react-toastify";

const AuthPage = () => {
	const [isLogin, setIsLogin] = useState(true);
	const [username, setusername] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();
	const { signup } = useSignup();
	const { login } = useLogin();
	const handleAuth = () => {
		setIsLogin(!isLogin);
	};
	const handleLogin = async (e) => {
		e.preventDefault();

		if (username.length === 0 || password.length === 0) {
			toast.error("You must fill all the input fields");
			return;
		}
		await login(username, password);
	};

	const handleSignup = async (e) => {
		e.preventDefault();

		if (username === "" || password === "") {
			toast.error("You must fill all the input fields");
			return;
		}
		await signup(username, password);
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
					{isLogin ? "Đăng nhập" : "Đăng ký"}
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
							value={username}
							onChange={(e) => setusername(e.target.value)}
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
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						></InputText>
					</div>
					<div style={{ marginTop: "50px" }}>
						<Button
							style={{
								width: "100%",
								display: "flex",
								justifyContent: "center",
							}}
							onClick={isLogin ? handleLogin : handleSignup}
						>
							{isLogin ? "Đăng nhập" : "Đăng ký"}
						</Button>
						<div
							style={{ marginTop: "20px", cursor: "pointer" }}
							onClick={handleAuth}
						>
							{isLogin
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
