# 💬 Real-time Chat Application

A full-stack real-time chat application built with **ReactJS**, **Node.js**,
**Socket.IO**, **Prisma** and **MongoDB**. Supports private chat, friend
requests, conversation management, seen status, typing status, and JWT-based
authentication.

## 🔧 Tech Stack

### 📦 Backend

- **Node.js** + **Express** – Build REST APIs and handle socket connections.
- **Socket.IO** – Real-time bi-directional communication.
- **Prisma** – Type-safe ORM for MongoDB.
- **JWT** – Authentication and session management.
- **Service Design Pattern** – Organize business logic into modular services.

### 💻 Frontend

- **ReactJS** – SPA frontend framework.
- **Axios** – HTTP client to interact with backend APIs.
- **Socket.IO Client** – Connect to backend via WebSocket.
- **PrimeReact** – UI component library with styled components.

## 🗃️ Database Schema Overview

The app uses MongoDB as the main database with the following key models:

- `User` – Stores user credentials and profile.
- `Message` – Holds messages sent between users.
- `Conversation` – Represents chat groups or private conversations.
- `SeenMessage` – Tracks who has seen which message.
- `ConversationMember` – Relationship table between users and conversations.
- `FriendRequest` – Manages friend requests between users.

Refer to [`prisma/schema.prisma`](./prisma/schema.prisma) for the complete
schema.

## 🚀 Getting Started

### 🔙 Backend

```bash
cd backend
npm install
npx prisma generate
npx prisma db push
npm run dev
```

### 🛠️ Configuration

In backend folder, add this `.env` with this contents:

```bash
PORT=3000
SECRET=treconsamactruyentainhaubaidongdaosdffasdasddasda
DATABASE_URL=mongodb+srv://<your_username>:<your_password>@chat-app-db.bwb12o4.mongodb.net/chat-app-db?retryWrites=true&w=majority&appName=<your_cluster_name>
```

### 🔙 Frontend

```bash
cd frontend
npm install
```

## 📬 Contact

### 📧 Email: ttkien2004@gmail.com

### 🐱 GitHub: https://github.com/ttkien2004
