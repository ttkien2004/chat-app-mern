const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/AuthRoutes");
const chatRoutes = require("./routes/ChatRoutes");
require("dotenv").config();
const { Server } = require("socket.io");
const http = require("http");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: "http://localhost:5173",
		methods: ["GET", "POST"],
	},
});
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);

const port = process.env.PORT || 5000;

// mongoose
// 	.connect(process.env.DATABASE_URL)
// 	.then(() => {
// 		app.listen(port, () => {
// 			console.log(`Listening to port ${port}`);
// 		});
// 	})
// 	.catch((err) => {
// 		console.error(err.message);
// 	});
const onlineUsers = new Map();
io.on("connection", (socket) => {
	console.log("A user connected: ", socket.id);

	socket.on("user-connected", (userId) => {
		onlineUsers.set(userId, socket.id);
		console.log(userId, socket.id);
	});
	socket.on("disconnect", () => {
		console.log("dissss");
		for (let [uid, sid] of onlineUsers.entries()) {
			if (sid === socket.id) {
				onlineUsers.delete(uid);
				break;
			}
		}
	});
	socket.on("check-user-online", (userId, callback) => {
		const isOnline = onlineUsers.has(userId);
		console.log(userId, isOnline);
		callback(isOnline);
	});

	socket.on("send-message", async (data) => {
		const { conversationId, text, senderId } = data;
		/*
      data sẽ có dạng như:
      {
        conversationId: "abc123",
        senderId: "user123",
        content: "Hello!"
      }
    */
		// Lưu tin nhắn vào database
		const message = await prisma.message.create({
			data: {
				conversationId: conversationId,
				senderId: senderId,
				text: text,
			},
			include: {
				sender: true,
			},
		});
		// Cập nhật lastMessage
		const conversationExist = await prisma.conversation.findUnique({
			where: {
				id: conversationId,
			},
		});
		if (conversationExist) {
			await prisma.conversation.update({
				where: {
					id: conversationId,
				},
				data: { lastMessage: { connect: { id: message.id } } },
			});
		} else {
			await prisma.conversation.create({
				data: { lastMessage: { connect: { id: message.id } } },
			});
		}

		// Gửi lại tin nhắn cho những người khác
		io.to(conversationId).emit("receive-message", message);
	});
	socket.on("join-conversation", (conversationId) => {
		socket.join(conversationId);
	});
});
server.listen(port, () => {
	console.log(`Listening to port ${port}`);
});
