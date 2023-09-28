import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";

function AllGames() {
	const baseUrl = import.meta.env.VITE_MICROSERVICES_URL;
	const [games, setGames] = useState([]);
	const { token } = useContext(AuthContext);

	const dateToReadable = (date) => {
		const dateString = new Date(date);
		const options = {
			year: "numeric",
			month: "long",
			day: "numeric",
			hour: "numeric",
			minute: "numeric",
		};
		return dateString.toLocaleDateString(undefined, options);
	};
	useEffect(() => {
		axios
			.get(`${baseUrl}/api/v1/games`, {
				headers: {
					Authorization: `Token ${token}`,
				},
			})
			.then((res) => {
				console.log(res.data);
				setGames(res.data.data);
			})
			.catch((err) => console.error(err));
	}, []);
	return (
		<div>
			<h1>All Games</h1>
			{games.length === 0 ? (
				<p>No Games</p>
			) : (
				<table className="gameTable">
					<thead>
						<tr>
							<th>Game Name</th>
							<th>Game Start</th>
							<th>Game Venue</th>
							<th>Team 1</th>
							<th>Team 2</th>
							<th>Completed?</th>
						</tr>
					</thead>
					<tbody>
						{games.map((game) => (
							<tr key={game.id}>
								<td>{game.game_name}</td>
								<td>{dateToReadable(game.game_start)}</td>
								<td>{game.game_venue}</td>
								<td>{game.team1}</td>
								<td>{game.team2}</td>
								<td>{game.is_completed ? "Yes" : "No"}</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	);
}

export default AllGames;
