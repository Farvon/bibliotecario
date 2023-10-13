import { useState, useEffect } from "react";
import styled from "styled-components";

import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";
import Tooltip from "@mui/material/Tooltip";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import {
  getInventarioById,
  getLibrosById,
} from "../backend/controllers/libros";

const MiReservaCard = ({ retiro }) => {
  const [inventarioById, setInventarioById] = useState();
  const [libroById, setLibroById] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getInventarioById(retiro.inventario_id)
      .then((data2) =>
        getLibrosById(data2[0].libro_id).then((data3) => {
          setInventarioById(data2[0]), setLibroById(data3[0]);
        })
      )
      .then(() => setLoading(false));
  }, []);

  const fechaRetiroString = retiro.fecha_retiro; // Supongamos que esto es "2023-03-10"
  const partesFechaRetiro = fechaRetiroString.split("-");
  const fechaRetiro = new Date(
    partesFechaRetiro[0], // Año
    partesFechaRetiro[2] - 1, // Mes (restamos 1 porque en JavaScript los meses van de 0 a 11)
    partesFechaRetiro[1] // Día
  );

  const fechaHoy = new Date();
  const diferenciaEnMilisegundos = fechaHoy - fechaRetiro;
  const dias = Math.floor(diferenciaEnMilisegundos / (1000 * 60 * 60 * 24));
  const estado = dias <= 3 ? "En tiempo" : "Excedido";

  return (
    <Tr>
      {!loading && inventarioById && libroById ? (
        <>
          <Td>{libroById.titulo}</Td>

          <Td>{inventarioById.inventario}</Td>
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
