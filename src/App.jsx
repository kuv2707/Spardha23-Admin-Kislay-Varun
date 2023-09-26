import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import AllUsers from './components/Pages/AllUsers'
import SportsRegistrations from './components/Pages/SportsRegistrations'
import DocumentVerification from './components/Pages/DocumentVerification'
import AllGames from './components/Pages/AllGames'

function App() {
  

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/allUsers" element={<AllUsers />} />
          <Route path="/sportsRegistrations" element={<SportsRegistrations />} />
          <Route path="/documentVerification" element={<DocumentVerification />} />
          <Route path="/allGames" element={<AllGames />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
