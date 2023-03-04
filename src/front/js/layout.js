import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./pages/home.jsx";
import { InfoCharacters } from "./pages/infoCharacters.jsx";
import { InfoPlanets } from "./pages/infoPlanets.jsx";
import { InfoFilms } from "./pages/infoFilms.jsx";
import { Login } from "./pages/login.jsx";
import injectContext from "./store/appContext";




//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  return (
    <div>
      <BrowserRouter basename={basename}>
          <ScrollToTop>
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/infoCharacters/:id" element={<InfoCharacters />} />
              <Route path="/infoPlanets/:id" element={<InfoPlanets />} />
              <Route path="/infoFilms/:id" element={<InfoFilms />} />
              <Route path="*" element={<h1>Not found!</h1>} />
            </Routes>
          </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
