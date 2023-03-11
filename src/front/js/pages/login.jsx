import React, { useContext, useState} from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";
import { Context } from "../store/appContext";
import { Navbar } from "../component/navbar.jsx";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { store, actions } = useContext(Context);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    // Prevent page reload
    e.preventDefault();
    if (email === "" || password === "") {
      alert("Enter your information to login");
    } else {
      const isAuth = await actions.getToken( {email, password} );;
      isAuth ? navigate("/home") : null;
    }
  };

  return (
    <>
      <nav className="navbar navbar-light bg-light mb-3 p-3 d-flex justify-content-center">
        <span className="navbar-brand mb-0 h1"><img src="https://img.icons8.com/ios/50/000000/star-wars.png"/></span>
      </nav>
      <div className="box d-flex p-1 rounded-2">
        <form className="form m-2">
          <div className="container">
            <label className="username m-1">Username : </label>
            <input
              className="usernameInput m-1"
              type="text"
              placeholder="Enter Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="password m-1">Password : </label>
            <input
              className="passwordInput m-1"
              type="password"
              placeholder="Enter Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="loginButton m-1"
              type="submit"
              onClick={handleSubmit}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
