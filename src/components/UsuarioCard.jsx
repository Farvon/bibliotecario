import * as React from "react";
import { useEffect, useState, useRef } from "react";
import styled from "styled-components";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";

const UsuarioCard = ({ user, onCloseIconClick, carreras }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        onCloseIconClick();
      }
    };

    // Bind and unbind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Backdrop>
      <Box
        ref={cardRef}
        sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,

            width: 500,
            maxWidth: 500,
            minWidth: 300,
            height: "100%",
          },
        }}
      >
        <Paper>
          <h2>Información de Usuario</h2>
          {user && carreras ? (
            <>
              <UserInfoContainer>
                <TextField
                  id="userNombre"
                  label="Nombre"
                  name="nombre"
                  variant="standard"
                  value={user.nombre}
                  disabled
                />
                <TextField
                  id="userEmail"
                  label="Email"
                  name="email"
                  variant="standard"
                  value={user.email}
                  disabled
                />
                <TextField
                  id="userTelefono"
                  label="Teléfono"
                  name="telefono"
                  variant="standard"
                  value={user.telefono}
                  disabled
                />
                <TextField
                  id="userDireccion"
                  label="Dirección"
                  name="direccion"
                  variant="standard"
                  value={user.direccion}
                  disabled
                />
                <TextField
                  id="userCarrera"
                  label="Carrera"
                  name="carrera"
                  variant="standard"
                  value={
                    user.carrera != null
                      ? carreras[user.carrera - 1].carrera
                      : ""
                  }
                  disabled
                />
                <TextField
                  id="userCurso"
                  label="Curso"
                  name="curso"
                  variant="standard"
                  value={user.curso}
                  disabled
                />
              </UserInfoContainer>
            </>
          ) : null}
        </Paper>
      </Box>
    </Backdrop>
  );
};

export default UsuarioCard;

const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  align-items: center;
  margin: auto;
  padding: 16px;
  gap: 20px;
  margin-bottom: 20px;
`;

const Backdrop = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.7);
`;
