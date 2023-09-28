import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";

function AllGames() {
  const baseUrl = import.meta.env.VITE_MICROSERVICES_URL;
  const [games, setGames] = useState([]);
  const { token } = useContext(AuthContext);

  const dateToReadable = date => {
    const dateString = new Date(date)
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return dateString.toLocaleDateString(undefined, options);;
  }
  useEffect(() => {
    axios
      .get(`${baseUrl}/api/v1/games`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        setGames(res.data.data);
      })
      .catch((err) => console.error(err));
  }, []);
  return (
    <div>
      <h1>All Games</h1>
      {games.map(game => {
        return (
          <div key={game.id} className="card">
            <div className="fields"> <span className="fieldName">Game Name: </span> {game.game_name}</div>
            <div className="fields"> <span className="fieldName">Game Start: </span> {dateToReadable(game.game_start)}</div>
            <div className="fields"> <span className="fieldName">Game Venue: </span> {game.game_venue}</div>
            <div className="fields"> <span className="fieldName">Team 1: </span> {game.team1}</div>
            <div className="fields"> <span className="fieldName">Team 2: </span> {game.team2}</div>
            <div className="fields"> <span className="fieldName">Completed?: </span> {game.is_completed === true ? "Yes": "No"}</div>
          </div>
        );
      })}
      {games.length === 0 && <p>No Games</p>}
    </div>
  );
}

export default AllGames;
