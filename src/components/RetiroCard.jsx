import { useState, useEffect } from "react";
import styled from "styled-components";

import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import BeenhereRoundedIcon from "@mui/icons-material/BeenhereRounded";
import ContactPageRoundedIcon from "@mui/icons-material/ContactPageRounded";
import AlarmOnIcon from "@mui/icons-material/AlarmOn";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";

import { getUserById } from "../backend/controllers/usuarios";
import {
  getInventarioById,
  getLibrosById,
  updateInventarioDevuelto,
} from "../backend/controllers/libros";

import {
  updateDevolucion,
  updateFechaDevolucion,
} from "../backend/controllers/reservas";

import UsuarioCard from "./UsuarioCard";
import useAlert from "../hooks/useAlerts";

const RetiroCard = ({ reserva, reservas, setReservas }) => {
  const [userById, setUserById] = useState();
  const [inventarioById, setInventarioById] = useState();
  const [libroById, setLibroById] = useState();
  const [showCard, setShowCard] = useState(false);

  const { alertSuccess, alertError } = useAlert();

  useEffect(() => {
    getInventarioById(reserva.inventario_id).then((data2) =>
      getLibrosById(data2[0].libro_id).then((data3) => {
        setInventarioById(data2[0]), setLibroById(data3[0]);
      })
    );

    getUserById(reserva.usuario_id).then((data) => setUserById(data[0]));
  }, []);

  const handleClick = () => {
    setShowCard(true);
  };

  const handleDevolucion = (id, inventario_id) => {
    const fechaDevolucion = new Date().toLocaleDateString("es-ES");

    updateDevolucion(id);
    updateInventarioDevuelto(inventario_id);
    updateFechaDevolucion(id, fechaDevolucion).then(() =>
      alertSuccess("Libro Devuelto")
    );
    const newReservas = reservas.filter((item) => item.id != id);
    setReservas(newReservas);
  };

  const fechaRetiroString = reserva.fecha_retiro; // Supongamos que esto es "2023-03-10"
  const partesFechaRetiro = fechaRetiroString.split("-");
  const fechaRetiro = new Date(
    partesFechaRetiro[0], // Año
    partesFechaRetiro[2] - 1, // Mes (restamos 1 porque en JavaScript los meses van de 0 a 11)
    partesFechaRetiro[1] // Día
  );

  const fechaHoy = new Date();
  const diferenciaEnMilisegundos = fechaHoy - fechaRetiro;
  const dias = Math.floor(diferenciaEnMilisegundos / (1000 * 60 * 60 * 24));
  const estado = dias <= 1 ? true : false;

  return (
    <Tr key={reserva.id}>
      {userById && inventarioById && libroById ? (
        <>
          <TdAlumno>
            <Tooltip title="Info" placement="top" arrow>
              <IconButton color="warning">
                <ContactPageRoundedIcon
                  fontSize="small"
                  onClick={() => handleClick()}
                />
              </IconButton>
            </Tooltip>
            {userById.nombre}
          </TdAlumno>
          <Td>{libroById.titulo}</Td>
          <Td>{inventarioById.inventario}</Td>
          <Td>{reserva.fecha_retiro}</Td>
          <Td>
            {estado ? (
              <DevueltoContainer>
                <AlarmOnIcon color="terciary" sx={{ opacity: 0.1 }} />
              </DevueltoContainer>
            ) : (
              <DevueltoContainer>
                <NotificationsActiveIcon color="error" />
              </DevueltoContainer>
            )}
          </Td>
          <Td>
            <Tooltip title="Reibido" placement="top" arrow>
              <IconButton
                onClick={() =>
                  handleDevolucion(reserva.id, reserva.inventario_id)
                }
              >
                <BeenhereRoundedIcon color="primary" />
              </IconButton>
            </Tooltip>
          </Td>

          {showCard ? (
            <UsuarioCard
              user={userById}
              onCloseIconClick={() => setShowCard(false)}
            />
          ) : null}
        </>
      ) : null}
    </Tr>
  );
};

export default RetiroCard;

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
  align-items: center;
  width: 20%;
  gap: 5%;
`;

const TdAlumno = styled.td`
  display: flex;
  justify-content: left;
  font-size: 100%;
  align-items: center;
  width: 20%;
  gap: 5%;
`;

const DevueltoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
