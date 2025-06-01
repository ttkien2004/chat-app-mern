import axios from "axios";
import axiosClient from "../axios/axiosClient";

const authApi = {
	login: async (username, password) => {
		try {
			const response = await axiosClient.post("/auth/login", {
				username,
				password,
			});
			if (response) {
				return response.data;
			}
		} catch (err) {
			throw err.response.data;
		}
	},
	signup: async (username, password) => {
		try {
			const response = await axiosClient.post("/auth/signup", {
				username,
				password,
			});
			if (response) {
				return response.data;
			}
		} catch (err) {
			throw err.response.data;
			// console.error(err.error);
		}
	},
};

export default authApi;
