import * as React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import DoneAllIcon from "@mui/icons-material/DoneAll";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import EditNoteIcon from "@mui/icons-material/EditNote";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import { getUserById, updateUsuario } from "../backend/controllers/usuarios";
import LoadingEditar from "./LoadingEditar";

import useAlert from "../hooks/useAlerts";
import { getCarreras } from "../backend/controllers/libros";

function HojaPerfil({ user_id }) {
  const [user, setUser] = useState();
  const [carreras, setCarreras] = useState([]);
  const [carreraSelectedNombre, setCarreraSelectedNombre] = useState("");
  const [editando, setEditando] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    direccion: "",
    carrera: null,
    curso: "",
  });

  const { alertSuccess, alertError } = useAlert();
  const carreraUsr = [];

  useEffect((carreraUsr) => {
    getUserById(user_id)
      .then(
        (data) => (
          setUser(data[0]),
          setUserData({
            nombre: data[0].nombre,
            email: data[0].email,
            telefono: data[0].telefono,
            direccion: data[0].direccion,
            carrera: data[0].carrera,
            curso: data[0].curso,
          })
        )
      )
      .then(() => getCarreras().then((carreras) => setCarreras(carreras[1])))
      .then(() => setLoading(false))
      .then(
        () =>
          (carreraUsr = carreras.find((item) => item.id == userData.carrera))
      )
      .then(() => setCarreraSelectedNombre(carreraUsr.carrera));
  }, []);

  const handleEdit = () => {
    setEditando(true);
    setLoading(true);
    updateUsuario(user_id, userData)
      .then(() => (setEditando(false), setLoading(false)))
      .then(() => alertSuccess("Usuario Editado"));
  };

  const handleChange = (e) => {
    setUserData((prevUserData) => {
      return {
        ...prevUserData,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleChangeCarrera = (event) => {
    const carrera = carreras.find(
      (carrera) => carrera.carrera == event.target.value
    );
    setCarreraSelectedNombre(carrera.carrera);
    setUserData((prevUserData) => {
      return {
        ...prevUserData,
        carrera: carrera.id,
      };
    });
  };

  const IniciarCarrera = () => {
    const carreraSlc = carreras.find((item) => item.id == userData.carrera);
    setCarreraSelectedNombre(carreraSlc.carrera);
  };

  return (
    userData &&
    carreras && (
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
            height: "100%",
          },
        }}
      >
        <Paper>
          <h2>Información de Usuario</h2>
          {user && !loading ? (
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
                {!editando ? (
                  <TextField
                    id="userCarrera"
                    label="Carrera"
                    name="carrera"
                    variant="standard"
                    value={
                      userData.carrera && carreras[userData.carrera - 1].carrera
                    }
                    disabled={!editando}
                  />
                ) : (
                  <FormControl variant="standard" sx={{ m: 1, width: 200 }}>
                    <InputLabel htmlFor="select-carreras">Carrera</InputLabel>

                    <Select
                      id="select-carrera"
                      value={carreraSelectedNombre}
                      label="Carrera"
                      onChange={handleChangeCarrera}
                      disabled={!editando}
                    >
                      {carreras.map((carrera) => (
                        <MenuItem key={carrera.id} value={carrera.carrera}>
                          {carrera.carrera}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
                <TextField
                  id="userCurso"
                  label="Curso"
                  name="curso"
                  variant="standard"
                  value={userData.curso}
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
    )
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
