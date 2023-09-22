import { useEffect, useState } from "react";
import styled from "styled-components";
import LibroCard from "./LibroCard";

const Libro = ({ libro, autor }) => {
  const [showCard, setShowCard] = useState(false);
  const [infoCard, setInfoCard] = useState([]);
  const [nombreAutor, setNombreAutor] = useState();

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
        <Td onClick={(e) => handleClick()}>
          <Img src="src\assets\icons\book.png" />
        </Td>
        <Td>{libro.titulo}</Td>
        <Td>{nombreAutor}</Td>
        <Td>{libro.editorial}</Td>
        <Td>{libro.cantidad}</Td>
      </Tr>

      {showCard ? (
        <LibroCard
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
`;

const Img = styled.img`
  display: flex;
  width: 5vw;
  cursor: pointer;
`;
