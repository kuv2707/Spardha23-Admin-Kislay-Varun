import axios from 'axios'
import React, { useEffect, useState } from 'react'

function AllUsers() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL
  const [users, setUsers] = useState([])

  useEffect(() => {
    axios.get(`${baseUrl}/auth/all`, {
      headers: {
        'Authorization': 'Token 612b7dfcfaa9bc52f3b00c9b25ad323f9ab083fa'
      },
    }).then(res => {
      console.log(res)
      setUsers(res.data)
    }).catch(err => console.error(err))
  }, [])
  return (
    <div>
      {
      users.map((user,index) => {
        return <div key={index} className='userCard'>
          <div className='fields'> <span>Name: </span> {user.name} </div>
          <div className='fields'> <span>Designation: </span> {user.designation} </div>
          <div className='fields'> <span>Institute: </span> {user.institution_name} </div>
          <div className='fields'> <span>Phone No.: </span> {user.phone_no} </div>
        </div>
      })
    }
    </div>
  )
}

export default AllUsers