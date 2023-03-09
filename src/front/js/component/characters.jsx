import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";

import { Context } from "../store/appContext";

export const Characters = () => {

    const { store, actions } = useContext(Context)

	useEffect(() => {
		actions.getCharacters();
	},[])
	
    return (
        <div className="container mt-2">
			<h2>Characters</h2>
			<div className="card-container mt-4 p-2 d-flex justify-content-between">
				{store.characters && store.characters.map( ( {name, hair_color, eye_color, gender, id}, i ) => (
					<div key= {i} className="card me-5">
						<img src={`https://starwars-visualguide.com/assets/img/characters/${i+1}.jpg`} className="card-img-top" alt="Loading from API" />
						<div className="card-body p-3">
							<h4 className="card-title">{name}</h4>
							<p className="card-text"> Gender: {gender}</p>
							<p className="card-text"> Hair Color: {hair_color}</p>
							<p className="card-text"> Eye-Color: {eye_color}</p>
						</div>
						<div className="card-footer d-flex justify-content-between">
							<Link to={`/infoCharacters/${i+1}`}>
								<button className="btn btn-outline-primary">Learn More!</button>
							</Link>
							<button className="like btn btn-outline-warning"><i
            				className={store.favorites.includes(name) ? "fas fa-heart" : "far fa-heart"} onClick={()=>{actions.favoriteCharacters(id)}} ></i></button>
						</div>
					</div>
				))}
			</div>
		</div>
    )
}