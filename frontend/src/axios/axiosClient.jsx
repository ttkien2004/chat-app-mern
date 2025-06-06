import axios from "axios";

const axiosClient = axios.create({
	baseURL: "http://localhost:3000/api",
	timeout: 10000,
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
	},
});

axiosClient.interceptors.request.use(
	(config) => {
		const token = sessionStorage.getItem("token");

		if (token) {
			const tokenString = JSON.parse(token);
			config.headers.Authorization = `Bearer ${tokenString}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);
export default axiosClient;
