import { useEffect, useState } from "react";
import styled from "styled-components";

import { getAutoresById } from "../services";

const LibroCard = ({ libro, autor_id }) => {
  const [nombreAutor, setNombreAutor] = useState([]);
  // console.log(autor_id);

  useEffect(() => {
    autor_id != null &&
      getAutoresById(autor_id).then((autorUnico) =>
        setNombreAutor(autorUnico[0])
      );
  }, []);

  //   console.log(nombreAutor[0].nombre);

  return (
    <>
      <Tr>
        <Td>imagen</Td>
        <Td>{libro.titulo}</Td>
        <Td>{autor_id != null ? nombreAutor[0].nombre : "Desconocido"}</Td>
        <Td>{libro.editorial}</Td>
        <Td>{libro.cantidad}</Td>
      </Tr>
    </>
  );
};

export default LibroCard;

const Tr = styled.tr`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Td = styled.td`
  display: flex;
  justify-content: center;
  width: 25%;
`;
