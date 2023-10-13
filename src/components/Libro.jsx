import { useEffect, useState } from "react";
import styled from "styled-components";
import LibroCard from "./LibroCard";

import IconButton from "@mui/material/IconButton";
import LayersClearIcon from "@mui/icons-material/LayersClear";
import Tooltip from "@mui/material/Tooltip";
import StickyNote2OutlinedIcon from "@mui/icons-material/StickyNote2Outlined";

import { deleteLibro, getDisponibles } from "../backend/controllers/libros";

import useAlert from "../hooks/useAlerts";

const Libro = ({
  user,
  libro,
  autor,
  admin,
  setInfoLibro,
  setNewBook,
  setEditar,
}) => {
  const [showCard, setShowCard] = useState(false);
  const [nombreAutor, setNombreAutor] = useState("");
  const [disponibles, setDisponibles] = useState();

  const { alertSuccess, alertError } = useAlert();

  const handleClick = () => {
    setShowCard(true);
  };

  const handleEditBook = (libro) => {
    setEditar(true);
    setInfoLibro(libro);
    setNewBook(true);
  };

  const handleDelete = (id) => {
    deleteLibro(id)
      .then(() => alertSuccess("Libro borrado correctamente"))
      .then(() => window.location.reload());
  };

  useEffect(() => {
    getDisponibles(libro.id).then((data) => setDisponibles(data));

    autor === "Desconocido"
      ? setNombreAutor("Desconocido")
      : setNombreAutor(autor.nombre);
  }, []);

  return (
    <>
      <Tr>
        {libro ? (
          <>
            <Td onClick={(e) => handleClick()}>
              <Img src="./book.png" />
            </Td>
            <Td onClick={(e) => handleClick()}>
              <A>{libro.titulo}</A>
            </Td>
            <Td>{nombreAutor}</Td>
            <Td>{libro.editorial}</Td>
            <Td>{libro.cantidad}</Td>
            <Td>{disponibles}</Td>
            {admin == true && (
              <Td>
                <Tooltip color="primary" title="Editar" placement="top" arrow>
                  <IconButton onClick={() => handleEditBook(libro)}>
                    <StickyNote2OutlinedIcon />
                  </IconButton>
                </Tooltip>

                <Tooltip color="error" title="Eliminar" placement="top" arrow>
                  <IconButton
                    onClick={() =>
                      swal({
                        icon: "warning",
                        title: `Eliminar libro "${libro.titulo}"?`,
                        closeOnClickOutside: false,
                        buttons: ["No", "Si"],
                        dangerMode: true,
                      }).then((willGiven) => {
                        if (willGiven) {
                          handleDelete(libro.id);
                        }
                      })
                    }
                  >
                    <LayersClearIcon />
                  </IconButton>
                </Tooltip>
              </Td>
            )}
          </>
        ) : null}
      </Tr>

      {showCard ? (
        <LibroCard
          admin={admin}
          user={user}
          libro={libro}
          autor={nombreAutor}
          disponibles={disponibles}
          onCloseIconClick={() => setShowCard(false)}
        />
      ) : null}
    </>
  );
};

export default Libro;

const Tr = styled.tr`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 0px;
  margin: 10px;
  border: 1px solid #eeeeee;
  box-shadow: 0px 6px 10px 0px rgba(117, 117, 117, 0.2);
  background-color: white;
`;

const Td = styled.td`
  display: flex;
  justify-content: center;
  width: 20%;
  gap: 5%;
`;

const Img = styled.img`
  display: flex;
  width: 5vw;
  cursor: pointer;
`;

const A = styled.a`
  text-decoration: none;
  cursor: pointer;

  &:hover {
    font-weight: bold;
    color: black;
  }
`;
