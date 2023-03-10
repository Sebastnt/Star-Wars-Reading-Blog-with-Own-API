import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";

import { Context } from "../store/appContext";

export const Films = () => {
    
	const { store, actions } = useContext(Context)

	useEffect(() => {
		actions.getFilms()
	},[])
	
    return (
        <div className="container mt-2">
			<h2>Films</h2>
			<div className="card-container mt-4 p-2 d-flex justify-content-between">
				{store.films && store.films.map( ( {title, episode_id, director, producer, release_date, id, url}, i ) => (
					<div key= {i} className="card me-5">
						<img src={url} className="card-img-top" alt="Loading Image from API" />
						<div className="card-body p-3">
							<h4 className="card-title">{title}, Episode: {episode_id}</h4>
							<p className="card-text"> Director: {director}</p>
							<p className="card-text"> Producer: {producer}</p>
							<p className="card-text"> Release Date: {release_date}</p>
						</div>
						<div className="card-footer d-flex justify-content-between">
							<Link to={`/infoFilms/${i+1}`}>
								<button className="btn btn-outline-primary">Learn More!</button>
							</Link>
							<button className="like btn btn-outline-warning"><i 
            				className={store.favorites.includes(title) ? "fas fa-heart" : "far fa-heart"}onClick={()=>{actions.favoriteFilms(id)}} ></i></button>
						</div>
					</div>
				))}
			</div>
		</div>
    )
}