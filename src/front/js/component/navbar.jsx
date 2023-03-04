import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";


export const Navbar = () => {

	const { store, actions } = useContext(Context)

	return (
		<nav className="navbar navbar-light bg-light mb-3 p-3">
			<Link to="/home">
				<span className="navbar-brand mb-0 h1"><img src="https://img.icons8.com/ios/50/000000/star-wars.png"/></span>
			</Link>
			<div className="dropdown ml-auto">
				<button className="btn btn-primary dropdown-toggle p-2" type="button" data-bs-toggle="dropdown" aria-expanded="false">
					Favorites
					<span className="badge bg-secondary rounded-pill">{store.favorites.length}</span>
				</button>
				<ul className="dropdown-menu dropdown-menu-end dropdown-menu-lg-end">
					{store.favorites.map( ( name, i ) => (
						<li key={i} className="dropdown-item favorite d-flex justify-content-between p-2">{name}<i className="fas fa-trash" onClick={()=>{actions.deleteFavorites(name)}} ></i></li>
					))}	
				</ul>
			</div>
		</nav>
	);
};