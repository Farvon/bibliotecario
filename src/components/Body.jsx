import { useEffect, useState } from "react";
import styled from "styled-components";

import { getLibros, getAutores } from "../backend/controllers/libros";
import Libro from "./Libro";

const Body = () => {
  const [bookSrch, setBookSrch] = useState();
  const [biblioteca, setBiblioteca] = useState();
  const [bibliotecaSrched, setBibliotecaSrched] = useState();
  const [autores, setAutores] = useState();

  useEffect(() => {
    getAutores().then((allAutores) => {
      setAutores(allAutores[1]);
    });

    getLibros().then((libros) => {
      setBiblioteca(libros[1]);
      setBibliotecaSrched(libros[1]);
    });
  }, []);

  const handleSrcBook = (src) => {
    const bookSrched = biblioteca.filter((item) =>
      item.titulo.toLowerCase().includes(src)
    );
    setBibliotecaSrched(bookSrched);
  };

  return (
    <>
      <Input
        value={bookSrch}
        placeholder="Que vas a leer hoy?..."
        onChange={(e) => handleSrcBook(e.target.value.toLowerCase())}
      />

      <Table>
        <Thead>
          <Tr>
            <Td></Td>
            <Td>Titulo</Td>
            <Td>Autor</Td>
            <Td>Editorial</Td>
            <Td>Ejemplares</Td>
          </Tr>
        </Thead>
        <tbody>
          {autores &&
            biblioteca &&
            bibliotecaSrched.map((item, index) => (
              <>
                <Libro
                  key={index}
                  libro={item}
                  autor={
                    item.autor_id
                      ? autores.find((e) => e.id === item.autor_id)
                      : "Desconocido"
                  }
                />
              </>
            ))}
        </tbody>
      </Table>
    </>
  );
};

export default Body;

const Input = styled.input`
  display: flex;
  margin: 0 auto;
  min-width: 20vw;
  width: 50vw;
  height: 20px;
  padding: 0.5em;
  border-radius: 15px;
  font-style: italic;
`;

const Table = styled.table`
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin: 0 auto;
  font-size: 0.8em;
  width: 80vw;
`;

const Thead = styled.thead``;

const Tr = styled.tr`
  display: flex;
  justify-content: space-between;
  margin: 10px;
  font-size: 1.2em;
  font-weight: bold;
`;

const Td = styled.td`
  display: flex;
  justify-content: center;
  width: 25%;
`;
