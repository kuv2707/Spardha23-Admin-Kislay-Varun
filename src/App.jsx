import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import {AuthProvider} from "./contexts/AuthContext";
import Navbar from "./components/Navbar/Navbar";

import AllUsers from './components/Pages/AllUsers'
import SportsRegistrations from './components/Pages/SportsRegistrations'
import DocumentVerification from './components/Pages/DocumentVerification'
import AllGames from './components/Pages/AllGames'

function App() {

	return (
		<AuthProvider>
			<BrowserRouter>
      <Navbar></Navbar>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
          <Route path="/allUsers" element={<AllUsers />} />
          <Route path="/sportsRegistrations" element={<SportsRegistrations />} />
          <Route path="/documentVerification" element={<DocumentVerification />} />
          <Route path="/allGames" element={<AllGames />} />
				</Routes>
			</BrowserRouter>
		</AuthProvider>
	);
}

export default App;
