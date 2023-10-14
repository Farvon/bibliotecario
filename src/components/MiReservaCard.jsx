import { useState, useEffect } from "react";
import styled from "styled-components";

import IconButton from "@mui/material/IconButton";
import DoNotDisturbAltRoundedIcon from "@mui/icons-material/DoNotDisturbAltRounded";
import Tooltip from "@mui/material/Tooltip";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import {
  getInventarioById,
  getLibrosById,
  updateInventarioUndo,
} from "../backend/controllers/libros";

import { deleteReserva } from "../backend/controllers/reservas";

const MiReservaCard = ({ reserva, misReservas, setMisReservas }) => {
  const [inventarioById, setInventarioById] = useState();
  const [libroById, setLibroById] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getInventarioById(reserva.inventario_id)
      .then((data2) =>
        getLibrosById(data2[0].libro_id).then((data3) => {
          setInventarioById(data2[0]), setLibroById(data3[0]);
        })
      )
      .then(() => setLoading(false));
  }, []);

  const handleRechazar = (reserva_id, inventario_id) => {
    console.log(reserva_id, inventario_id);
    deleteReserva(reserva_id);
    updateInventarioUndo(inventario_id);
    const newReservas = misReservas.filter((item) => item.id != reserva_id);
    setMisReservas(newReservas);
  };

  return (
    <Tr>
      {!loading && inventarioById && libroById ? (
        <>
          <Td>{libroById.titulo}</Td>

          <Td>{inventarioById.inventario}</Td>

          <Td>
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
export default MiReservaCard;

const Tr = styled.tr`
  display: flex;
  align-items: center;
  padding: 10px;
  margin: 10px;
  border: 1px solid #eeeeee;
  box-shadow: 0px 6px 10px 0px rgba(117, 117, 117, 0.2);
  background-color: white;
`;
const Td = styled.td`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
`;

const DevueltoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const TdEstado = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ dias }) => (dias <= 1 ? "green" : "red")};
`;
