import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import {AuthProvider} from "./contexts/AuthContext";
import Navbar from "./components/Navbar/Navbar";


function App() {

	return (
		<AuthProvider>
			<BrowserRouter>
      <Navbar></Navbar>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
				</Routes>
			</BrowserRouter>
		</AuthProvider>
	);
}

export default App;
