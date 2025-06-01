import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import "./index.css";
// import ChatPage from "./pages/ChatPage";
// import AuthPage from "./pages/AuthPage";

import { ToastContainer } from "react-toastify";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import ChatPage from "./pages/ChatPage";

function App() {
	return (
		<div>
			<ToastContainer />
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<HomePage />}></Route>
					<Route path="/auth" element={<AuthPage />}></Route>
					<Route path="/chat" element={<ChatPage />}></Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
