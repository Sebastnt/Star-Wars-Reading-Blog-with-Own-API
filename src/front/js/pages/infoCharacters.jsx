import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "../component/navbar.jsx";

import { Context } from "../store/appContext";

import "../../styles/home.css";

export const InfoCharacters = () => {
  const { store, actions } = useContext(Context);

  const { id } = useParams();

  useEffect(() => {
    actions.getCharacters(id);
  }, []);

  console.log(store.characters.name);
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="infotop d-flex justify-content-evenly p-2">
          <img
            src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
            className="infocard rounded-start"
            alt="..."
          />
          <div className="info p-3 text-center rounded-end">
            <h1>{store.characters.name}</h1>
            <p>
              Some quick example text to build on the card title and make up the
              bulk of the card's content. Some quick example text to build on
              the card title and make up the bulk of the card's content. Some
              quick example text to build on the card title and make up the bulk
              of the card's content. Some quick example text to build on the
              card title and make up the bulk of the card's content.
            </p>
          </div>
        </div>
        <div className="infofooter mt-4 p-3">
          <table className="table table-borderless">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Year of Birth</th>
                <th scope="col">Height</th>
                <th scope="col">Mass</th>
                <th scope="col">Skin Color</th>
                <th scope="col">Gender</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{store.characters.name}</td>
                <td>{store.characters.birth_year}</td>
                <td>{store.characters.height}</td>
                <td>{store.characters.mass}</td>
                <td>{store.characters.skin_color}</td>
                <td>{store.characters.gender}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
