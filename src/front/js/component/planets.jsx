import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";

import { Context } from "../store/appContext";

export const Planets = () => {
   
	const { store, actions } = useContext(Context)

	useEffect(() => {
		actions.getPlanets()
	},[])


    return (
        <div className="container mt-2">
			<h2>Planets</h2>
			<div className="card-container mt-4 p-2 d-flex justify-content-between">
				{store.planets && store.planets.map( ( {name, population, terrain, climate}, i ) => (
					<div key= {i} className="card me-5">
						<img src={`https://starwars-visualguide.com/assets/img/planets/${i + 1}.jpg`}
						onError={(e) => {
						e.target.onError = null; 
						e.target.src ="https://i.pinimg.com/originals/3a/95/ad/3a95adf3df957702adba35591520e119.jpg";
						}} className="card-img-top" alt="..." />
						<div className="card-body p-3">
							<h4 className="card-title">{name}</h4>
							<p className="card-text"> Population: {population}</p>
							<p className="card-text"> Terrain: {terrain}</p>
							<p className="card-text"> Climate: {climate}</p>
						</div>
						<div className="card-footer d-flex justify-content-between">
							<Link to={`/infoPlanets/${i+1}`}>
								<button className="btn btn-outline-primary">Learn More!</button>
							</Link>
							<button className="like btn btn-outline-warning"><i 
            				className={store.favorites.includes(name) ? "fas fa-heart" : "far fa-heart"}onClick={()=>{actions.addFavorites(name)}} ></i></button>
						</div>
					</div>
				))}
			</div>
		</div>
    )
}