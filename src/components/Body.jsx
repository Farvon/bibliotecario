import { useEffect, useState } from "react";
import styled from "styled-components";

import {
  getLibros,
  getAutores,
  getCarreras,
} from "../backend/controllers/libros";
import Libro from "./Libro";
import MenuCarreras from "./MenuCarreras";

import AddToPhotosRoundedIcon from "@mui/icons-material/AddToPhotosRounded";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";

const Body = ({ user, admin, setNewBook, setInfoLibro, setEditar }) => {
  const [biblioteca, setBiblioteca] = useState();
  const [bibliotecaSrched, setBibliotecaSrched] = useState();
  const [autores, setAutores] = useState();
  const [carreras, setCarreras] = useState();
  const [showAcciones, setShowAcciones] = useState(true);
  const [actualizar, setActualizar] = useState(false);

  const [totalPages, setTotalPages] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage, setBooksPerPage] = useState(10);

  const [carreraToFilter, setCarreraToFilter] = useState("");
  const [inputToFilter, setInputToFilter] = useState("");

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;

  const calculatePages = (librosTotales) => {
    const pages = Math.ceil(librosTotales.length / booksPerPage);
    return pages;
  };

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    getAutores().then((allAutores) => {
      setAutores(allAutores[1]);
    });

    getLibros().then((libros) => {
      setBiblioteca(libros[1]);
      setBibliotecaSrched(libros[1]);
      const pages = calculatePages(libros[1]);
      setTotalPages(pages);
    });

    getCarreras().then((carreras) => setCarreras(carreras[1]));
  }, [actualizar]);

  useEffect(() => {
    bibliotecaSrched && filterBooks();
  }, [carreraToFilter, inputToFilter]);

  const handleAdd = () => {
    setEditar(false);
    setNewBook(true);
  };

  const filterBooks = () => {
    const autoresMatch = autores.filter((autor) =>
      autor.nombre.toLowerCase().includes(inputToFilter.toLocaleLowerCase())
    );

    let autoresMatchId = [];
    autoresMatch.map((elem) => autoresMatchId.push(elem.id));

    const bookSrched = biblioteca.filter(
      (item) =>
        autoresMatchId.includes(item.autor_id) ||
        item.titulo.toLowerCase().includes(inputToFilter.toLocaleLowerCase()) ||
        item.editorial.toLowerCase().includes(inputToFilter.toLocaleLowerCase())
    );
    const bookSrchedByCarrera = carreraToFilter
      ? bookSrched.filter((item) => item.carrera_id == carreraToFilter)
      : bookSrched;

    setBibliotecaSrched(bookSrchedByCarrera);
    const pages = calculatePages(bookSrchedByCarrera);
    setTotalPages(pages);
  };

  const currentBooks =
    bibliotecaSrched &&
    bibliotecaSrched.slice(indexOfFirstBook, indexOfLastBook);

  return (
    <>
      <InputContainer>
        <Input
          value={inputToFilter}
          placeholder="Que vas a leer hoy?..."
          onChange={(e) => setInputToFilter(e.target.value)}
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
      {carreras && (
        <MenuCarreras
          showAcciones={showAcciones}
          carreras={carreras}
          carreraToFilter={carreraToFilter}
          setCarreraToFilter={setCarreraToFilter}
        />
      )}
      {bibliotecaSrched && (
        <PaginationContainer>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handleChange}
          />
        </PaginationContainer>
      )}

      <Table>
        <Thead>
          <Tr>
            <Td></Td>
            <Td>Titulo</Td>
            <TdWeb>Autor</TdWeb>
            <TdWeb>Editorial</TdWeb>
            <TdWeb>Ejemplares</TdWeb>
            <Td>Disponibles</Td>
            {admin == true && <Td>Acciones</Td>}
          </Tr>
        </Thead>
        {autores && biblioteca && carreras ? (
          <tbody>
            {currentBooks.map((item) => (
              <Libro
                key={item.id}
                setActualizar={setActualizar}
                actualizar={actualizar}
                showAcciones={showAcciones}
                setShowAcciones={setShowAcciones}
                user={user}
                libro={item}
                autor={
                  item.autor_id && autores.find((e) => e.id === item.autor_id)
                }
                admin={admin}
                setInfoLibro={setInfoLibro}
                setNewBook={setNewBook}
                setEditar={setEditar}
                carrera={
                  item.carrera_id &&
                  carreras.find((e) => e.id === item.carrera_id)
                }
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

  @media (max-width: 767px) {
    width: 90vw;
  }
`;

const Thead = styled.thead``;

const Tr = styled.tr`
  display: flex;
  justify-content: space-between;
  margin: 10px;
  font-size: 1.2em;
  font-weight: bold;
  @media (max-width: 767px) {
    font-size: 0.8em;
  }
`;

const Td = styled.td`
  display: flex;
  justify-content: center;
  width: 20%;

  @media (max-width: 767px) {
    width: 25%;
  }
`;

const TdWeb = styled.td`
  display: flex;
  justify-content: center;
  width: 20%;

  @media (max-width: 767px) {
    display: none;
  }
`;

const PaginationContainer = styled.div`
  width: 90vw;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;
