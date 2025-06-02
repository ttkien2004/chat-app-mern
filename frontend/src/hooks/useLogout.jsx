import authApi from "../services/AuthService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import socket from "../socket/socket";
import { useAuthContext } from "./useAuthContext";

const useLogout = () => {
	const navigate = useNavigate();
	const { dispatch } = useAuthContext();
	const logout = async (userId) => {
		try {
			await authApi.logout(userId);
			sessionStorage.removeItem("data");
			sessionStorage.clear();
			socket.disconnect();
			toast.success("Thank you for using our service!");
			setTimeout(() => {
				navigate("/");
				dispatch({ type: "LOGOUT" });
			}, 3000);
		} catch (err) {
			console.log(err);
		}
	};
	return { logout };
};
export default useLogout;
