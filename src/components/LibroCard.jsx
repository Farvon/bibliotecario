import { useEffect, useState } from "react";
import styled from "styled-components";

import { getAutoresById } from "../services";

const LibroCard = ({ libro, autor }) => {
  const [nombreAutor, setNombreAutor] = useState("");
  // console.log(autor_id);

  useEffect(() => {
    autor && setNombreAutor(autor);
  }, []);

  // console.log(nombreAutor);

  return (
    <>
      <Tr>
        <Td>imagen</Td>
        <Td>{libro.titulo}</Td>
        {<Td>{autor.nombre ? autor.nombre : "Desconocido"}</Td>}
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
