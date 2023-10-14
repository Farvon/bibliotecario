import { useEffect, useRef, useState } from "react";
import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import styled from "styled-components";
import useAlert from "../hooks/useAlerts";

import {
  // getDisponibles,
  getInventario,
  updateInventario,
} from "../backend/controllers/libros";
import { crearReserva } from "../backend/controllers/reservas";

const LibroCard = ({
  admin,
  user,
  onCloseIconClick,
  libro,
  autor,
  disponibles,
}) => {
  const { alertSuccess, alertError } = useAlert();

  const [alignment, setAlignment] = React.useState("web");

  const cardRef = useRef(null);
  // const [disponibles, setDisponibles] = useState();
  //CONTROLAR SI ESTO ES NECESARIO
  const [dataReserva, setDataReserva] = useState({
    usuario_id: "",
    inventario_id: "",
    fecha_retiro: "",
  });

  const [inventarioCompleto, setInventarioCompleto] = useState([]);
  const [inventarioSelected, setInventarioSelected] = useState();

  useEffect(() => {
    //Trae todos los inventarios del Libro
    getInventario(libro.id).then((data) => setInventarioCompleto(data));

    // // Trae disponibles segun inventario
    // getDisponibles(libro.id).then((data) => setDisponibles(data));

    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        onCloseIconClick();
      }
    };

    // Bind and unbind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const handleInventario = (inventario) => {
    inventarioSelected == inventario
      ? setInventarioSelected(null)
      : setInventarioSelected(inventario);
  };

  const handleReserva = () => {
    var today = new Date();
    var day = today.getDate();
    var month = today.getMonth() + 1;
    var year = today.getFullYear();
    var fecha = `${year}/${month}/${day}`;

    const newReserva = {
      usuario_id: user.id,
      inventario_id: inventarioSelected,
      fecha_retiro: fecha,
      fecha_devolucion: null,
    };

    setDataReserva(newReserva);
    crearReserva(newReserva)
      .then(() => updateInventario(newReserva.inventario_id))
      .then(() => alertSuccess("Reserva generada"));
    onCloseIconClick();
  };

  return (
    <>
      <Backdrop>
        <CardContainer ref={cardRef}>
          <CardForm>
            <FormImg src="./book.png" />
            <FormInfo>
              <Titulo>{libro.titulo}</Titulo>
              <Info>
                <Etiqueta>Autor:</Etiqueta>
                <InfoLibro> {autor}</InfoLibro>
              </Info>
              <Info>
                <Etiqueta>Editorial:</Etiqueta>
                <InfoLibro> {libro.editorial}</InfoLibro>
              </Info>
              <Info>
                <Etiqueta>Año de publicación:</Etiqueta>
                <InfoLibro> {libro.fecha_publicacion}</InfoLibro>
              </Info>
              <Info>
                <Etiqueta>Lugar de publicación:</Etiqueta>
                <InfoLibro> {libro.lugar}</InfoLibro>
              </Info>
              <Info>
                <Etiqueta>Cant. de páginas:</Etiqueta>
                <InfoLibro> {libro.paginas}</InfoLibro>
              </Info>
              <Info>
                <Etiqueta>I.S.B.N:</Etiqueta>
                <InfoLibro> {libro.isbn}</InfoLibro>
              </Info>
              <Info>
                <Etiqueta>Cantidad de copias:</Etiqueta>
                <InfoLibro> {libro.cantidad}</InfoLibro>
              </Info>
              <Info>
                <Etiqueta>Disponibles en biblioteca:</Etiqueta>
                <InfoLibro> {disponibles}</InfoLibro>
              </Info>
              <Info>
                <Etiqueta>N° Inventario</Etiqueta>
                <ToggleButtonGroup
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "auto",
                  }}
                  size="small"
                  color="primary"
                  value={alignment}
                  exclusive
                  onChange={handleChange}
                >
                  {inventarioCompleto.map((item) => (
                    <ToggleButton
                      value={item.inventario}
                      onClick={() => handleInventario(item.id)}
                      disabled={item.reservado}
                    >
                      {item.inventario}
                    </ToggleButton>
                  ))}
                </ToggleButtonGroup>
              </Info>
            </FormInfo>
          </CardForm>
          {admin == false && (
            <CardButtons>
              <ReservarButton
                onClick={() =>
                  inventarioSelected != null
                    ? swal({
                        title: "Reservar?",
                        closeOnClickOutside: true,
                        buttons: ["No", "Si"],
                      }).then((willReserved) => {
                        if (willReserved) {
                          handleReserva();
                        }
                      })
                    : alertError("No se seleccionó ningún invenario")
                }
              >
                Reservar
              </ReservarButton>
              <CloseButton onClick={() => onCloseIconClick()}>
                Cancelar
              </CloseButton>
            </CardButtons>
          )}
        </CardContainer>
      </Backdrop>
    </>
  );
};

export default LibroCard;

const Backdrop = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.7);
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 8px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  padding: 18px 0px;
  width: 50vw;
`;

const CardForm = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  width: 100%;
  margin: auto;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;

const FormImg = styled.img`
  display: flex;
  width: 40%;
  height: 40%;
`;

const FormInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Titulo = styled.span`
  font-weight: bold;
  font-size: 1.5em;
  margin-bottom: 8px;
  max-width: 40vw;
`;

const Info = styled.div`
  display: flex;
  flex-direction: row;
  width: 90%;
  margin-bottom: 12px;
  padding: 0 20px;
  flex-wrap: wrap;
`;

const Etiqueta = styled.span`
  font-weight: bold;
  margin-right: 10px;
`;

const InfoLibro = styled.span`
  display: flex;
  margin: 0;
`;

const CardButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 100%;
`;
const ReservarButton = styled.button`
  width: 20%;
  background: lightblue;
  border: none;
  box-shadow: 2px 2px 3px #c5c5c5, -6px -6px 12px #ffffff;
`;

const CloseButton = styled.button`
  width: 20%;
  background: pink;
  border: none;
  box-shadow: 2px 2px 3px #c5c5c5, -6px -6px 12px #ffffff;
`;
