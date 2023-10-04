import * as React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";

import DoneAllIcon from "@mui/icons-material/DoneAll";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import EditNoteIcon from "@mui/icons-material/EditNote";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import { getUserById, updateUsuario } from "../backend/controllers/usuarios";
import LoadingEditar from "./LoadingEditar";

function HojaPerfil({ user_id }) {
  const [user, setUser] = useState();
  const [editando, setEditando] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    direccion: "",
  });

  useEffect(() => {
    console.log(user_id);
    getUserById(user_id)
      .then((data) => setUser(data[0]))
      .then(() =>
        setUserData({
          nombre: user.nombre,
          email: user.email,
          telefono: user.telefono,
          direccion: user.direccion,
        })
      );
  }, []);

  const handleEdit = () => {
    console.log(userData);
    updateUsuario(user_id, userData).then(() => setEditando(false));
  };

  const handleChange = (e) => {
    setUserData((prevUserData) => {
      return {
        ...prevUserData,
        [e.target.name]: e.target.value,
      };
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        "& > :not(style)": {
          m: 1,

          width: 500,
          maxWidth: 500,
          minWidth: 300,
          height: "50vh",
        },
      }}
    >
      <Paper>
        <h2>Información de Usuario</h2>
        {user && loading ? (
          <>
            <UserInfoContainer>
              <TextField
                id="userNombre"
                label="Nombre"
                name="nombre"
                variant="standard"
                value={userData.nombre}
                onChange={handleChange}
                disabled={!editando}
              />
              <TextField
                id="userEmail"
                label="Email"
                name="email"
                variant="standard"
                value={userData.email}
                onChange={handleChange}
                disabled
              />
              <TextField
                id="userTelefono"
                label="Teléfono"
                name="telefono"
                variant="standard"
                value={userData.telefono}
                onChange={handleChange}
                disabled={!editando}
              />
              <TextField
                id="userDireccion"
                label="Dirección"
                name="direccion"
                variant="standard"
                value={userData.direccion}
                onChange={handleChange}
                disabled={!editando}
              />
            </UserInfoContainer>
            {!editando ? (
              <Tooltip
                onClick={() => setEditando(true)}
                color="primary"
                title="Editar"
                placement="bottom"
                arrow
              >
                <IconButton>
                  <EditNoteIcon />
                </IconButton>
              </Tooltip>
            ) : (
              <EditIconsContainer>
                <Tooltip
                  onClick={() => handleEdit()}
                  color="success"
                  title="Aceptar"
                  placement="bottom"
                  arrow
                >
                  <IconButton>
                    <DoneAllIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip
                  onClick={() => setEditando(false)}
                  color="error"
                  title="Cancelar"
                  placement="bottom"
                  arrow
                >
                  <IconButton>
                    <CancelOutlinedIcon />
                  </IconButton>
                </Tooltip>
              </EditIconsContainer>
            )}
          </>
        ) : (
          <LoadingEditar />
        )}
      </Paper>
    </Box>
  );
}

export default HojaPerfil;

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

const EditIconsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10%;
`;
