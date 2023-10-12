import { useEffect, useState } from "react";
import styled from "styled-components";

import { getLibros, getAutores } from "../backend/controllers/libros";
import Libro from "./Libro";

import AddToPhotosRoundedIcon from "@mui/icons-material/AddToPhotosRounded";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Body = ({ user, admin, setNewBook, setInfoLibro, setEditar }) => {
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

  const handleAdd = () => {
    setEditar(false);
    setNewBook(true);
  };

  return (
    <>
      <InputContainer>
        <Input
          value={bookSrch}
          placeholder="Que vas a leer hoy?..."
          onChange={(e) => handleSrcBook(e.target.value.toLowerCase())}
        />
        {admin == true && (
          <AgregarContainer>
            <Tooltip
              onClick={() => handleAdd()}
              color="success"
              title="Agregar"
              placement="bottom"
              arrow
            >
              <IconButton>
                <AddToPhotosRoundedIcon fontSize="large" />
              </IconButton>
            </Tooltip>
          </AgregarContainer>
        )}
      </InputContainer>

      <Table>
        <Thead>
          <Tr>
            <Td></Td>
            <Td>Titulo</Td>
            <Td>Autor</Td>
            <Td>Editorial</Td>
            <Td>Ejemplares</Td>
            {admin == true && <Td>Acciones</Td>}
          </Tr>
        </Thead>
        {autores && biblioteca ? (
          <tbody>
            {bibliotecaSrched.map((item) => (
              <Libro
                key={item.id}
                user={user}
                libro={item}
                autor={
                  item.autor_id
                    ? autores.find((e) => e.id === item.autor_id)
                    : "Desconocido"
                }
                admin={admin}
                setInfoLibro={setInfoLibro}
                setNewBook={setNewBook}
                setEditar={setEditar}
              />
            ))}
          </tbody>
        ) : (
          <Box sx={{ display: "flex", margin: "auto" }}>
            <CircularProgress color="inherit" sx={{ opacity: "0.3" }} />
          </Box>
        )}
      </Table>
    </>
  );
};

export default Body;

const InputContainer = styled.div`
  display: Flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 2%;
`;

const AgregarContainer = styled.div`
  dismplay: flex;
`;

const Input = styled.input`
  display: flex;

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

const ImgContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  margin-top: 20px;
`;
