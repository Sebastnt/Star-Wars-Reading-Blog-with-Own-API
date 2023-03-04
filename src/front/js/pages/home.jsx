import React, { useContext, useEffect } from "react";
import "../../styles/home.css";
import { Context } from "../store/appContext";

import { Characters } from "../component/characters.jsx";
import { Planets } from "../component/planets.jsx";
import { Films } from "../component/films.jsx";
import { Navbar } from "../component/navbar.jsx";


export const Home = () => {

	const { store, actions } = useContext(Context)
	
	useEffect(() => {
		actions.getCharacters();
	},[])

	useEffect(() => {
		actions.getPlanets();
	},[])

	useEffect(() => {
		actions.getFilms();
	},[])


	return (
		<>
			<Navbar />
			<Characters />
			<Planets />
			<Films />
		</>
	)
};
