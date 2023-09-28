import { useContext, useEffect } from 'react';
import Card from '../Card/Card'
import styles from './Home.module.css'
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';



function Home() {
	const {token} = useContext(AuthContext)
	const navigate = useNavigate();
	useEffect(() => {
		if (!token) {
			navigate("/login");
		}
	})
    return (
		<>
			<h1 className={styles.heading}>Admin Dashboard</h1>
			<p>
				Access a comprehensive view of all user data at a glance on this
				dedicated admin page
			</p>
			<div className='card-container'>
				<Card
					heading={"All Users"}
					message={"View all users and their details"}
					linkTo={"/allUsers"}
				/>
				<Card
					heading={"Sports Registrations"}
					message={"View all sports registrations and their details"}
					linkTo={"/sportsRegistrations"}
				/>
				<Card
					heading={"Document Verification"}
					message={"View all document verifications and their details"}
					linkTo={"/documentVerification"}
				/>
				<Card
					heading={"All Games"}
					message={"View all games of categories Boy, Girl, Mixed"}
					linkTo={"/allGames"}
				/>
			</div>
		</>
	);
}

export default Home
