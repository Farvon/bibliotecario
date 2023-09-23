import { useState } from "react";
import { styled } from "styled-components";

import { crearUsuario } from "../backend/controllers/usuarios";

const SingUp = () => {
  const [userData, setUserData] = useState({
    nombre: "",
    email: "",
    password: "",
    nombre: "",
    telefono: "",
    direccion: "",
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
    crearUsuario(userData).then(() => (window.location.href = "/")); //agregar un Then({data,error}) para redirigir o mostrar una alerta
  };

  return (
    <>
      <form>
        <label>Nombre</label>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          onChange={handleChange}
        />
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
        <label>Telefono</label>
        <input
          type="text"
          name="telefono"
          placeholder="Nombre"
          onChange={handleChange}
        />
        <label>Direccion</label>
        <input
          type="text"
          name="direccion"
          placeholder="Nombre"
          onChange={handleChange}
        />
        <button type="submit" onClick={(e) => handleSubmit(e)}>
          Crear Usuario
        </button>
      </form>
    </>
  );
};

export default SingUp;
