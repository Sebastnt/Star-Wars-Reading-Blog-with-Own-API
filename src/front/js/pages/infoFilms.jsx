import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Navbar } from "../component/navbar.jsx";

import { Context } from "../store/appContext";

import "../../styles/home.css";

export const InfoFilms = () => {

    const { store, actions } = useContext(Context)

    const navigate = useNavigate();

    const {id} = useParams();

    let token = (localStorage.getItem("token"))

    useEffect(() => {
		if (token) {
			actions.getFilms(id);
		} else {
			navigate("/login")
		};
	},[])
    
    return (
        <>
            <Navbar />
            <div className="container">
                <div className="infotop d-flex justify-content-evenly p-2">

                    <img src={`https://starwars-visualguide.com/assets/img/films/${id}.jpg`} className="infocard" alt="..." />
                    <div className="info p-3 text-center">
                        <h1>{store.films.title}, Episode: {store.films.episode_id}</h1>
                        <p>{store.films.opening_crawl}</p>
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
                                <td>{store.films.title}</td>
                                <td>{store.films.episode_id}</td>
                                <td>{store.films.director}</td>
                                <td>{store.films.producer}</td>
                                <td>{store.films.release_date}</td>
                            </tr>
                        </tbody>
                    </table>
                </div> 
            </div>
        </>
    )
}