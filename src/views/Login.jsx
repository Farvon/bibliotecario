import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";

import { loginUser } from "../backend/controllers/usuarios";

const Login = ({ setUser, setLoginStatus }) => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUserData((prevUserData) => {
      return {
        ...prevUserData,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    loginUser(userData).then((data) => {
      data.user != null
        ? (setUser(data), console.log("Logueado"), setLoginStatus(true))
        : console.log("error de logueo");
    });
  };

  return (
    <>
      <form>
        <label>E-mail</label>
        <input
          type="email"
          name="email"
          placeholder="E-mail"
          onChange={handleChange}
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <button type="submit" onClick={(e) => handleSubmit(e)}>
          Ingresar
        </button>
      </form>
      <button>
        <Link to="/singup">Registrarse</Link>
      </button>
    </>
  );
};

export default Login;
