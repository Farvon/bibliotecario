import { useState, useEffect } from "react";
import styled from "styled-components";

import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import BeenhereRoundedIcon from "@mui/icons-material/BeenhereRounded";
import ContactPageRoundedIcon from "@mui/icons-material/ContactPageRounded";

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

import useAlert from "../hooks/useAlerts";

const RetiroCard = ({ reserva, reservas, setReservas }) => {
  const [userById, setUserById] = useState();
  const [inventarioById, setInventarioById] = useState();
  const [libroById, setLibroById] = useState();

  const { alertSuccess, alertError } = useAlert();

  useEffect(() => {
    getInventarioById(reserva.inventario_id).then((data2) =>
      getLibrosById(data2[0].libro_id).then((data3) => {
        setInventarioById(data2[0]), setLibroById(data3[0]);
      })
    );

    getUserById(reserva.usuario_id).then((data) => setUserById(data[0]));
  }, []);

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
  return (
    <Tr key={reserva.id}>
      {userById && inventarioById && libroById ? (
        <>
          <Td>
            <Tooltip title="Info" placement="top" arrow>
              <IconButton color="warning">
                <ContactPageRoundedIcon
                  fontSize="small"
                  onClick={() => handleShowUserInfo()}
                />
              </IconButton>
            </Tooltip>
            {userById.nombre}
          </Td>
          <Td>{libroById.titulo}</Td>
          <Td>{inventarioById.inventario}</Td>
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
  width: 25%;
  gap: 5%;
`;
