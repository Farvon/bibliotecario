import { useEffect, useState } from "react";
import styled from "styled-components";

const LibroCard = ({ libro, autor }) => {
  const [nombreAutor, setNombreAutor] = useState("");
  // console.log(autor_id);

  useEffect(() => {
    autor && setNombreAutor(autor);
  }, []);

  const handleClick = () => {
    console.log("clic");
  };
  // console.log(nombreAutor);

  return (
    <>
      <Tr>
        <Td onClick={(e) => handleClick()}>
          <Img src="src\assets\icons\book.png" />
        </Td>
        <Td>{libro.titulo}</Td>
        {autor === "Desconocido" ? (
          <Td>Desconocido </Td>
        ) : (
          <Td>{autor.nombre}</Td>
        )}
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
`;

const Img = styled.img`
  display: flex;
  width: 5vw;
  cursor: pointer;
`;
