import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import authApi from "../services/AuthService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
	// const [error, setError] = useState("");
	const { dispatch } = useAuthContext();
	const navigate = useNavigate();
	const login = async (username, password) => {
		try {
			const response = await authApi.login(username, password);
			if (response) {
				sessionStorage.setItem("data", JSON.stringify(response.data));
				dispatch({ type: "LOGIN", payload: response.data });
				toast.success("Login successfully!");
				setTimeout(() => {
					navigate("/chat");
				}, 3000);
			}
		} catch (err) {
			// console.log(err);
			toast.error(err.error, {
				position: "top-right",
			});
		}
	};
	return {
		login,
	};
};
export default useLogin;
