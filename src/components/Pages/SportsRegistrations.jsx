import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";

function SportsRegistrations() {
	const baseUrl = import.meta.env.VITE_BACKEND_URL;
	const [contingents, setContingents] = useState([]);
	const { token } = useContext(AuthContext);

	const formatText = (str) => {
		const words = str.split("_");
		const capitalizedWords = words.map(
			(word) => word.charAt(0).toUpperCase() + word.slice(1)
		);
		const result = capitalizedWords.join(" ");
		return result;
	};

	useEffect(() => {
		axios
			.get(`${baseUrl}/teams/contingent/all`, {
				headers: {
					Authorization: `Token ${token}`,
				},
			})
			.then((res) => {
				console.log(contingents);
				setContingents(res.data);
			})
			.catch((err) => console.error(err));
	}, []);
	return (
		<div>
			<h1>All Sports Registrations</h1>
			{contingents.length === 0 ? (
				<p>No Registrations</p>
			) : (
				<table className="registrationTable">
					<thead>
						<tr>
							{Object.keys(contingents[0]).map((key) => (
								<th key={key}>{formatText(key)}</th>
							))}
						</tr>
					</thead>
					<tbody>
						{contingents.map((contingent, index) => (
							<tr key={index}>
								{Object.keys(contingent).map((key) => (
									<td key={key + contingent[key]}>
										{key === "games"
											? contingent[key].join(", ")
											: contingent[key]}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	);
}

export default SportsRegistrations;
