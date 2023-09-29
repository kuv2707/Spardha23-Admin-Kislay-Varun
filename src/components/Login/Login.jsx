import { useContext, useState } from "react";
import axios from "axios";
import styles from "./Login.module.css";
import isEmail from "validator/lib/isEmail";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const [name_email, setName_email] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const { setToken } = useContext(AuthContext);
	const navigate = useNavigate();
	let baseUrl = import.meta.env.VITE_BACKEND_URL;
	if (baseUrl.substring(baseUrl.length - 1) !== "/") baseUrl += "/";

	const handleSubmit = async (e) => {
		e.preventDefault();

		setError(null);
		setLoading(true);

		try {
			// Data validation
			if (!name_email || !password) {
				throw new Error("All fields are required.");
			}
			if (!password.match(/^[a-zA-Z0-9-_.!]{6,30}$/)) {
				throw new Error(
					"Invalid password. Password must be between 6 and 30 characters long, and may contain english letters, numbers and special characters - _ . !"
				);
			}

			if (name_email.includes("@")) {
				if (!isEmail(name_email)) {
					throw new Error("Invalid email address.");
				}
			} else if (!name_email.match(/^[a-zA-Z0-9-_.]{6,30}$/)) {
				throw new Error(
					"Invalid username. Username must be between 6 and 30 characters long, and may contain english letters, numbers and special characters - _ ."
				);
			}

			//data is validated

			const response = await axios.post(`${baseUrl}auth/login/`, {
				username: name_email,
				password,
			});
			console.log(response.data.role != "staff");
			if (
				response.data.role !== "admin" &&
				response.data.role !== "staff"
			) {
				throw new Error(
					"You are not authorized to login. Admin or Staff only."
				);
			}

			setToken(response.data.token);
			console.log("token set")
			setTimeout(()=>navigate("/"),1500);
		} catch (error) {
			setError(error.message || "An error occurred. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className={styles.loginContainer}>
			<form className={styles.loginForm} onSubmit={handleSubmit}>
				
				<h2>Login</h2>
				<div className={styles.formGroup}>
					<label>Username or Email</label>
					<input
						type="text"
						value={name_email}
						onChange={(e) => {
							setName_email(e.target.value);
						}}
						required
					/>
				</div>
				<div className={styles.formGroup}>
					<label>Password</label>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>
				<button type="submit" disabled={loading}>
					{loading ? "Loading..." : "Login"}
				</button>
				{error && <div className={styles.errorMessage}>{error}</div>}
			</form>
		</div>
	);
};

export default Login;
