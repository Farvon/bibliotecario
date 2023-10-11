import { useState } from "react";
import styled from "styled-components";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import DoneAllIcon from "@mui/icons-material/DoneAll";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import EditNoteIcon from "@mui/icons-material/EditNote";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

const CrearEditarLibro = ({ setNewBook }) => {
  const [age, setAge] = useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const editando = false;

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,

            width: "80vw",
            maxWidth: 700,
            minWidth: 300,
            height: "100%",
          },
        }}
      >
        <Paper>
          <h2>Nuevo Libro</h2>
          <UserInfoContainer>
            <TextField
              id="libroTitulo"
              label="Título"
              name="titulo"
              variant="standard"
              //   value={userData.nombre}
              //   onChange={handleChange}
              //   disabled={!editando}
            />

            <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
              <InputLabel id="demo-simple-select-standard-label">
                Autor
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={age}
                onChange={handleChange}
                label="Autor"
                name="autor"
              >
                <MenuItem value="">
                  <em>Ninguno</em>
                </MenuItem>
                <MenuItem value="">
                  <a onClick={() => alert("Nuevo Autor")}>Agregar Autor</a>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            <TextField
              id="libroEditorial"
              label="Editorial"
              name="editorial"
              variant="standard"
              //   value={userData.telefono}
              //   onChange={handleChange}
              //   disabled={!editando}
            />
            <TextField
              id="libroLugar"
              label="Lugar"
              name="lugar"
              variant="standard"
              //   value={userData.direccion}
              //   onChange={handleChange}
              //   disabled={!editando}
            />
            <TextField
              id="libroCantidad"
              label="Cantidad de copias"
              name="cantidad"
              variant="standard"
            />
            <TextField
              id="libroPaginas"
              label="Cantidad de Páginas"
              name="paginas"
              variant="standard"
              //   value={userData.direccion}
              //   onChange={handleChange}
              //   disabled={!editando}
            />
            <TextField
              id="libroFecha"
              label="Fecha de publicación"
              name="fecha_publicacion"
              variant="standard"
              //   value={userData.direccion}
              //   onChange={handleChange}
              //   disabled={!editando}
            />
            <TextField
              id="libroIsbn"
              label="I.S.B.N."
              name="isbm"
              variant="standard"
              //   value={userData.direccion}
              //   onChange={handleChange}
              //   disabled={!editando}
            />
          </UserInfoContainer>
          {!editando ? (
            <Tooltip
              //   onClick={() => setEditando(true)}
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
                // onClick={() => handleEdit()}
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
                // onClick={() => setEditando(false)}
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
        </Paper>
      </Box>
      <button onClick={() => setNewBook(false)}>Atras</button>
    </>
  );
};

export default CrearEditarLibro;

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
