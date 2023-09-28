import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
const AuthContext = createContext();
AuthProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
function AuthProvider({ children }) {
	const jwt = localStorage.getItem("token");
	const [isLoggedIn, setIsLoggedIn] = useState(!!jwt);
	const [token, setToken] = useState(jwt);
	useEffect(
		function () {
			if (token) {
				localStorage.setItem("token", token);
				setIsLoggedIn(true);
			} else {
				localStorage.removeItem("token");
				setIsLoggedIn(false);
			}
		},
		[token]
	);
	function logout() {
		setToken(null)
	}
	return (
		<AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, token,setToken, logout }}
		>
			{children}
		</AuthContext.Provider>
	);
}

export  {AuthProvider,AuthContext};
