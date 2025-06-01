import React, { createContext, useReducer, useEffect } from "react";

// create context
export const AuthContext = createContext();

// reducer
export const authReducer = (state, action) => {
	switch (action.type) {
		case "LOGIN":
			return { user: action.payload };
		case "LOGOUT":
			return { user: null };
		default:
			return state;
	}
};

// context provider
export const AuthContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(authReducer, {
		user: null,
	});
	useEffect(() => {
		const data = JSON.parse(sessionStorage.getItem("data") || "{}");
		if (data) {
			dispatch({ type: "LOGIN", payload: data });
		}
	}, []);
	return (
		<AuthContext.Provider value={{ ...state, dispatch }}>
			{children}
		</AuthContext.Provider>
	);
};
