import { Link } from "react-router-dom";
import AuthPage from "../pages/AuthPage";
import "./style.css";
const Header = () => {
	return (
		<div className="header">
			<div className="icon">😎 Chat App Demo</div>
			<div className="auth">
				<Link to={"/auth"}>Đăng nhập/ Đăng ký</Link>
			</div>
		</div>
	);
};

export default Header;
