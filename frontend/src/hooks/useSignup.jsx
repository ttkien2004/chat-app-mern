import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import authApi from "../services/AuthService";
import { toast } from "react-toastify";

const useSignup = () => {
	const [error, setError] = useState("");
	const { dispatch } = useAuthContext();
	const signup = async (username, password) => {
		try {
			const response = await authApi.signup(username, password);
			if (response) {
				console.log(response);
				toast.success("Signup successfully!");
			}
		} catch (err) {
			// console.log(err);
			toast.error(err.error, {
				position: "top-right",
			});
		}
	};
	return {
		signup,
	};
};
export default useSignup;
