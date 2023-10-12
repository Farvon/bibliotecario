import { useState, useEffect } from "react";
import styled from "styled-components";

import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import DoNotDisturbAltRoundedIcon from "@mui/icons-material/DoNotDisturbAltRounded";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import { deleteReserva, updateReserva } from "../backend/controllers/reservas";
import { getUserById } from "../backend/controllers/usuarios";
import {
  getInventarioById,
  getLibrosById,
  updateInventarioUndo,
} from "../backend/controllers/libros";

const ReservaCard = ({ reserva, reservas, setReservas }) => {
  const [userById, setUserById] = useState();
  const [inventarioById, setInventarioById] = useState();
  const [libroById, setLibroById] = useState();

  useEffect(() => {
    getInventarioById(reserva.inventario_id).then((data2) =>
      getLibrosById(data2[0].libro_id).then((data3) => {
        setInventarioById(data2[0]), setLibroById(data3[0]);
      })
    );

    getUserById(reserva.usuario_id).then((data) => setUserById(data[0]));
  }, []);

  const handleAprobar = (id) => {
    updateReserva(id);
    const newReservas = reservas.filter((item) => item.id != id);
    setReservas(newReservas);
  };

  const handleRechazar = (reserva_id, inventario_id) => {
    deleteReserva(reserva_id);
    updateInventarioUndo(inventario_id);
    const newReservas = reservas.filter((item) => item.id != reserva_id);
    setReservas(newReservas);
  };

  return (
    <Tr>
      {userById && inventarioById && libroById ? (
        <>
          <Td>{userById.nombre}</Td>
          <Td>{libroById.titulo}</Td>
          <Td>{inventarioById.inventario}</Td>
          <Td>
            <Tooltip title="Aprobar" placement="top" arrow>
              <IconButton
                onClick={() =>
                  swal({
                    title: "Se entregó el libro al Alumno/a?",
                    closeOnClickOutside: false,
                    buttons: ["No", "Si"],
                  }).then((willGiven) => {
                    if (willGiven) {
                      handleAprobar(reserva.id);
                    }
                  })
                }
              >
                <CheckCircleOutlineRoundedIcon color="success" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Denegar" placement="top" arrow>
              <IconButton
                onClick={() =>
                  swal({
                    title: "Rechazar Reserva?",
                    closeOnClickOutside: false,
                    buttons: ["No", "Si"],
                    dangerMode: true,
                  }).then((willNotGiven) => {
                    if (willNotGiven) {
                      handleRechazar(reserva.id, reserva.inventario_id);
                    }
                  })
                }
              >
                <DoNotDisturbAltRoundedIcon color="error" />
              </IconButton>
            </Tooltip>
          </Td>
        </>
      ) : (
        <Box sx={{ display: "flex", margin: "auto" }}>
          <CircularProgress color="inherit" sx={{ opacity: "0.3" }} />
        </Box>
      )}
    </Tr>
  );
};

export default ReservaCard;

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
  gap: 5%;
`;
