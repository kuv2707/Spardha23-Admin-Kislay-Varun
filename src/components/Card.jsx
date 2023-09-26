import React from 'react'
import { Link } from 'react-router-dom'

function Card({heading, message, linkTo}) {
  return (
    <div>
        <h2>{heading}</h2>
        <p>{message} </p>
        <Link to={linkTo} > <button>Visit To Know More</button> </Link>
    </div>
  )
}

export default Card