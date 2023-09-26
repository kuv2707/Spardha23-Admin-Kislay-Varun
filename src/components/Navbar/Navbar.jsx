import { useContext } from "react";
import styles from "./Navbar.module.css";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";

function Navbar() {
	const { logout, isLoggedIn } = useContext(AuthContext);

	return (
		<div>
			{isLoggedIn && (
				<button onClick={logout}>
					<Link to="/login">Logout</Link>
				</button>
			)}
		</div>
	);
}

export default Navbar;
