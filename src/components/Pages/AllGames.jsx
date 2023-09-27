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
      return <div key={game.id} className='userCard'>
        <h2>{gameTypes[game.game_type]}</h2>
        <div className='fields'> <span>Name: </span> {game.name} </div>
      </div>
    }
  return (
    <div>
      {
        [...boyGames.map(mapfunc),...girlGames.map(mapfunc),...mixedGames.map(mapfunc)]
      }
    </div>
  )
}

export default AllGames