import { Link } from "react-router-dom";
import AuthPage from "../pages/AuthPage";
import "./style.css";
import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect, useState } from "react";
import { Button } from "primereact/button";
import useLogout from "../hooks/useLogout";
const Header = () => {
	const { user } = useAuthContext();
	const [userName, setUsername] = useState("");
	useEffect(() => {
		console.log(user);
		if (user) {
			setUsername(user.username);
		}
	}, []);
	const { logout } = useLogout();
	const handleLogout = async () => {
		await logout(user.id);
	};
	return (
		<div className="header">
			<div className="icon">😎 Chat App Demo</div>
			<div className="auth">
				{user && user.username ? (
					<div style={{ display: "flex", alignItems: "center" }}>
						<div style={{ marginRight: "15px" }}>{user.username}</div>
						<div>
							<Button label="Logout" outlined onClick={handleLogout}></Button>
						</div>
					</div>
				) : (
					<Link to={"/auth"}>Đăng nhập/ Đăng ký</Link>
				)}
			</div>
		</div>
	);
};

export default Header;
