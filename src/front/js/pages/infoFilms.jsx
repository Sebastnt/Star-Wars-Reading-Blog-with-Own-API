import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "../component/navbar.jsx";

import { Context } from "../store/appContext";

import "../../styles/home.css";

export const InfoFilms = () => {

    const { store, actions } = useContext(Context)

    const {id} = useParams();

    const [film, setFilm] = useState({});

    const setFilmInfoAsync = async () => {
		const singleFilm = await actions.getFilms(id);
		setFilm(singleFilm);
	}

    useEffect(() => {
		setFilmInfoAsync();
	},[])
    
    return (
        <>
            <Navbar />
            <div className="container">
                <div className="infotop d-flex justify-content-evenly p-2">

                    <img src={`https://starwars-visualguide.com/assets/img/films/${id}.jpg`} className="infocard" alt="..." />
                    <div className="info p-3 text-center">
                        <h1>{film.title}, Episode: {film.episode_id}</h1>
                        <p>{film.opening_crawl}</p>
                    </div>
                </div>
                <div className="infofooter mt-4 p-3"> 
                    <table className="table table-borderless">
                        <thead>
                            <tr>
                                <th scope="col">Title</th>
                                <th scope="col">Episode</th>
                                <th scope="col">Director</th>
                                <th scope="col">Producer</th>
                                <th scope="col">Release_date</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{film.title}</td>
                                <td>{film.episode_id}</td>
                                <td>{film.director}</td>
                                <td>{film.producer}</td>
                                <td>{film.release_date}</td>
                            </tr>
                        </tbody>
                    </table>
                </div> 
            </div>
        </>
    )
}