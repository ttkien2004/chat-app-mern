import authApi from "../services/AuthService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import socket from "../socket/socket";

const useLogout = () => {
	const navigate = useNavigate();
	const logout = async (userId) => {
		try {
			await authApi.logout(userId);
			sessionStorage.removeItem("data");
			sessionStorage.clear();
			socket.disconnect();
			toast.success("Thank you for using our service!");
			setTimeout(() => {
				navigate("/");
			}, 3000);
		} catch (err) {
			console.log(err);
		}
	};
	return { logout };
};
export default useLogout;
