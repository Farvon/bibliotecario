import { useState } from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";

import { crearUsuario } from "../backend/controllers/usuarios";

const Login = () => {
  const [userData, setUserData] = useState({
    nombre: "",
    email: "",
    password: "",
  });

  console.log(userData);

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
    crearUsuario(userData).then(console.log("Usuario Creado"));
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
