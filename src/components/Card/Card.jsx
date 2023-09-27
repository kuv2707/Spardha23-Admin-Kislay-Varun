import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Card.module.css'
function Card({heading, message, linkTo}) {
  return (
    <div className={styles.cardDiv}>
        <h2>{heading}</h2>
        <p>{message} </p>
        <Link to={linkTo} > <button>Visit Now</button> </Link>
    </div>
  )
}

export default Card