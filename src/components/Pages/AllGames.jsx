import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import axios from 'axios'

function AllGames() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL
  const [boyGames, setBoyGames] = useState([])
  const [girlGames, setGirlGames] = useState([])
  const [mixedGames, setMixedGames] = useState([])
  const { token } = useContext(AuthContext)
  const games = [boyGames, girlGames, mixedGames]
  const gameTypes = {
    "B": "Boys",
    "G": "Girls", 
    "M": "Mixed"
  }

  useEffect(() => {
    let i = 0
    for (let setXGames of [setBoyGames, setGirlGames, setMixedGames]) {
      console.log("Hi")
      axios.get(`${baseUrl}/teams/games/${i++}`, {
        headers: {
          'Authorization': `Token ${token}`
        },
      }).then(res => {
        console.log(res)
        setXGames(res.data)
      }).catch(err => console.error(err))
    }
  }
    , [])
    const mapfunc=(game) => {
      return (
			<div key={game.id} className="card">
				<div className="fields">
					{" "}
					<span className="fieldName">Name: </span> {game.name}{" "}
				</div>
				<div className="fields">
					{" "}
					<span className="fieldName">Min Players: </span>{" "}
					{game.min_players}{" "}
				</div>
				<div className="fields">
					{" "}
					<span className="fieldName">Max Players: </span>{" "}
					{game.max_players}{" "}
				</div>
			</div>
		);
    }
  return (
		<div>
			<h1>All Games</h1>
			<h2>Boys</h2>
			{boyGames.map(mapfunc)}
			{boyGames.length === 0 && <p>No Boy Games</p>}
			<h2>Girls</h2>
			{girlGames.map(mapfunc)}
			{girlGames.length === 0 && <p>No Girl Games</p>}
			<h2>Mixed</h2>
			{mixedGames.map(mapfunc)}
			{mixedGames.length === 0 && <p>No Mixed Games</p>}
		</div>
  );
}

export default AllGames