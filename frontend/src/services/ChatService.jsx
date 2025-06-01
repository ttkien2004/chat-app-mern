import axios from "axios";
import axiosClient from "../axios/axiosClient";

const chatApi = {
	getUserList: async (id) => {
		try {
			const response = await axiosClient.get("/chat/getUsers", {
				params: {
					userId: id,
				},
			});
			if (response) {
				return response.data;
			}
		} catch (err) {
			throw err.response.data;
		}
	},
};
export default chatApi;
