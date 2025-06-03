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
	getPeopleList: async (userId) => {
		try {
			const response = await axiosClient.get("/chat/get-people-list", {
				params: {
					userId: userId,
				},
			});
			return response.data;
		} catch (err) {
			throw err.response.data;
		}
	},
	sendFriendRequest: async (userId, friendId) => {
		try {
			const response = await axiosClient.post("/chat/send-friend-req", {
				userId,
				friendId,
			});
			return response.data;
		} catch (err) {
			throw err.response.data;
		}
	},
	getFriendRequests: async (userId) => {
		try {
			const response = await axiosClient.get("/chat/get-friend-req", {
				params: {
					userId,
				},
			});
			return response.data;
		} catch (err) {
			throw err.response.data;
		}
	},
	addMember: async (userId, friendId) => {
		try {
			const response = await axiosClient.post("/chat/add-new-member", {
				memberId: friendId,
				userId,
			});
			return response.data;
		} catch (err) {
			throw err.response.data;
		}
	},
};
export default chatApi;
