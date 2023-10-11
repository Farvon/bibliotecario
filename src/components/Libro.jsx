import { useEffect, useState } from "react";
import styled from "styled-components";
import LibroCard from "./LibroCard";

import IconButton from "@mui/material/IconButton";
import LayersClearIcon from "@mui/icons-material/LayersClear";
import Tooltip from "@mui/material/Tooltip";
import StickyNote2OutlinedIcon from "@mui/icons-material/StickyNote2Outlined";

const Libro = ({ user, libro, autor, admin }) => {
  const [showCard, setShowCard] = useState(false);
  const [nombreAutor, setNombreAutor] = useState("");

  const handleClick = () => {
    setShowCard(true);
  };

  useEffect(() => {
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
            <Td>{libro.titulo}</Td>
            <Td>{nombreAutor}</Td>
            <Td>{libro.editorial}</Td>
            <Td>{libro.cantidad}</Td>
            {admin == true && (
              <Td>
                <Tooltip color="primary" title="Editar" placement="top" arrow>
                  <IconButton onClick={() => alert("Editar " + libro.titulo)}>
                    <StickyNote2OutlinedIcon />
                  </IconButton>
                </Tooltip>

                <Tooltip color="error" title="Eliminar" placement="top" arrow>
                  <IconButton onClick={() => alert("Borrar " + libro.titulo)}>
                    <LayersClearIcon />
                  </IconButton>
                </Tooltip>
              </Td>
            )}
          </>
        ) : (
          "Hola"
        )}
      </Tr>

      {showCard ? (
        <LibroCard
          admin={admin}
          user={user}
          libro={libro}
          autor={nombreAutor}
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
  width: 25%;
  gap: 5%;
`;

const Img = styled.img`
  display: flex;
  width: 5vw;
  cursor: pointer;
`;
