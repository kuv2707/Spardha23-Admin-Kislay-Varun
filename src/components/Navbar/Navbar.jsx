import { useContext } from "react";
import styles from "./Navbar.module.css";
import { AuthContext } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
	const { logout, isLoggedIn } = useContext(AuthContext);
	const navigate = useNavigate();
	function logoutHandler() {
		logout();
		navigate("/login");
	}
	return (
		<div className={styles.navbar}>
			<h1
				className={styles.heading}
			>
				Spardha&apos;23 Admin Page
			</h1>
			<button className={styles.logOut} onClick={logoutHandler} disabled={!isLoggedIn}>
				<Link to="/login">Logout</Link>
			</button>
		</div>
	);
}

export default Navbar;
