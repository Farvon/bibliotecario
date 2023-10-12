import { useEffect, useState } from "react";
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

import {
  getAutores,
  postNewAutor,
  editarLibro,
  crearLibro,
} from "../backend/controllers/libros";

import useAlert from "../hooks/useAlerts";

const CrearEditarLibro = ({ setNewBook, infoLibro, setInfoLibro, editar }) => {
  const [libroData, setLibroData] = useState({
    titulo: "",
    autor_id: null,
    editorial: "",
    lugar: "",
    cantidad: null,
    paginas: null,
    fecha_publicacion: null,
    isbn: "",
  });

  const { alertSuccess, alertError } = useAlert();

  const [autores, setAutores] = useState([]);
  const [autorSelectedNombre, setAutorSelectedNombre] = useState("");

  useEffect(() => {
    getAutores().then((allAutores) => {
      setAutores(allAutores[1]);
    });

    setLibroData({
      titulo: infoLibro.titulo,
      autor_id: infoLibro.autor_id,
      editorial: infoLibro.editorial,
      lugar: infoLibro.lugar,
      cantidad: infoLibro.cantidad,
      paginas: infoLibro.paginas,
      fecha_publicacion: infoLibro.fecha_publicacion,
      isbn: infoLibro.isbn,
    });
  }, []);

  const handleChange = (e) => {
    e.target.name == "cantidad" ||
    e.target.name == "paginas" ||
    e.target.name == "fecha_publicacion"
      ? setLibroData((prevUserData) => {
          return {
            ...prevUserData,
            [e.target.name]: Number(e.target.value),
          };
        })
      : setLibroData((prevUserData) => {
          return {
            ...prevUserData,
            [e.target.name]: e.target.value,
          };
        });
  };

  const hundleSubmitLibro = (e) => {
    e.preventDefault();
    console.log(editar);
    editar ? actualizarLibro() : crearNuevoLibro();
  };

  const crearNuevoLibro = () => {
    const cantidadInt = Number(libroData.cantidad);
    const paginasInt = Number(libroData.paginas);
    const fechaInt = Number(libroData.fecha_publicacion);
    setLibroData((prevUserData) => {
      return {
        ...prevUserData,
        cantidad: cantidadInt,
        paginas: paginasInt,
        fecha_publicacion: fechaInt,
      };
    });

    libroData.titulo != "" &&
    libroData.autor_id != "" &&
    libroData.cantidad != null
      ? crearLibro(libroData)
          .then(() => alertSuccess("Libro creado correctamente"))
          .then(() => handleCancel())
      : alertError("Título, Autor y Cantidad no pueden quedar vacios");
  };

  const actualizarLibro = () => {
    const cantidadInt = Number(libroData.cantidad);
    const paginasInt = Number(libroData.paginas);
    const fechaInt = Number(libroData.fecha_publicacion);
    setLibroData((prevUserData) => {
      return {
        ...prevUserData,
        cantidad: cantidadInt,
        paginas: paginasInt,
        fecha_publicacion: fechaInt,
      };
    });

    libroData.titulo != "" &&
    libroData.autor_id != "" &&
    libroData.cantidad != null &&
    libroData.paginas != null
      ? editarLibro(infoLibro.id, libroData)
          .then(() => alertSuccess("Libro Actualizado correctamente"))
          .then(() => handleCancel())
      : alertError("Título, Autor y Cantidad no pueden quedar vacios");
  };

  const handleAddAutor = () => {
    swal("Ingrese el nombre del autor", {
      content: "input",
    }).then((value) => {
      value != null ??
        postNewAutor(value).then(() =>
          alertSuccess("Autor creado correctamente")
        );
    });
  };

  const handleChangeAutor = (event) => {
    const autor = autores.find((autor) => autor.nombre == event.target.value);
    setAutorSelectedNombre(autor.nombre);
    setLibroData((prevUserData) => {
      return {
        ...prevUserData,
        autor_id: autor.id,
      };
    });
  };

  const handleCancel = () => {
    setInfoLibro({
      titulo: "",
      autor_id: null,
      editorial: "",
      lugar: "",
      cantidad: null,
      paginas: null,
      fecha_publicacion: null,
      isbn: "",
    });
    setNewBook(false);
  };

  return (
    <>
      {autores ? (
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
                value={libroData.titulo}
                onChange={handleChange}
              />

              <FormControl variant="standard" sx={{ m: 1, width: 200 }}>
                <InputLabel htmlFor="select-autores">Autores</InputLabel>
                <Select
                  id="select-autores"
                  value={autorSelectedNombre}
                  label="Autores"
                  onChange={handleChangeAutor}
                >
                  <MenuItem value={""} onClick={() => handleAddAutor()}>
                    <a>Agregar nuevo Autor</a>
                  </MenuItem>

                  {autores.map((autor) => (
                    <MenuItem key={autor.id} value={autor.nombre}>
                      {autor.nombre}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                id="libroEditorial"
                label="Editorial"
                name="editorial"
                variant="standard"
                value={libroData.editorial}
                onChange={handleChange}
              />
              <TextField
                id="libroLugar"
                label="Lugar"
                name="lugar"
                variant="standard"
                value={libroData.lugar}
                onChange={handleChange}
              />
              <TextField
                id="libroCantidad"
                label="Cantidad de copias"
                name="cantidad"
                variant="standard"
                value={libroData.cantidad}
                onChange={handleChange}
              />
              <TextField
                id="libroPaginas"
                label="Cantidad de Páginas"
                name="paginas"
                variant="standard"
                value={libroData.paginas}
                onChange={handleChange}
              />
              <TextField
                id="libroFecha"
                label="Año de publicación"
                name="fecha_publicacion"
                variant="standard"
                value={libroData.fecha_publicacion}
                onChange={handleChange}
              />
              <TextField
                id="libroIsbn"
                label="I.S.B.N."
                name="isbn"
                variant="standard"
                value={libroData.isbn}
                onChange={handleChange}
              />
            </UserInfoContainer>

            <EditIconsContainer>
              <Tooltip
                onClick={(e) =>
                  swal({
                    title: !editar
                      ? `Agregar nuevo libro "${libroData.titulo}"?`
                      : `Actualizar libro "${libroData.titulo}"?`,
                    closeOnClickOutside: false,
                    buttons: ["No", "Si"],
                  }).then((willGiven) => {
                    if (willGiven) {
                      hundleSubmitLibro(e);
                    }
                  })
                }
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
                color="error"
                title="Cancelar"
                placement="bottom"
                arrow
                onClick={() => handleCancel()}
              >
                <IconButton>
                  <CancelOutlinedIcon />
                </IconButton>
              </Tooltip>
            </EditIconsContainer>
          </Paper>
        </Box>
      ) : null}
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
