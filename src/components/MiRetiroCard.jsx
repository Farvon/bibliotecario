import { useState, useEffect } from "react";
import styled from "styled-components";

import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";
import Tooltip from "@mui/material/Tooltip";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";

import {
  getInventarioById,
  getLibrosById,
} from "../backend/controllers/libros";

const MiRetiroCard = ({ retiro }) => {
  const [inventarioById, setInventarioById] = useState();
  const [libroById, setLibroById] = useState();

  useEffect(() => {
    getInventarioById(retiro.inventario_id).then((data2) =>
      getLibrosById(data2[0].libro_id).then((data3) => {
        setInventarioById(data2[0]), setLibroById(data3[0]);
      })
    );
  }, []);

  //   const handleDevolucion = (id, inventario_id) => {
  //     updateDevolucion(id);
  //     updateInventarioDevuelto(inventario_id);
  //     const newReservas = reservas.filter((item) => item.id != id);
  //     setReservas(newReservas);
  //   };
  return (
    <Tr key={retiro.id}>
      {inventarioById && libroById ? (
        <>
          <Td>{libroById.titulo}</Td>

          <Td>{inventarioById.inventario}</Td>
          <Td>{retiro.fecha_retiro}</Td>
          <Td>
            {retiro.devuelto ? (
              <DevueltoContainer>
                <span>Devuelto</span>
                <Tooltip color="success">
                  <FileDownloadDoneIcon />
                </Tooltip>
              </DevueltoContainer>
            ) : (
              <DevueltoContainer>
                <span>Pendiente</span>
                <Tooltip color="warning">
                  <HourglassTopIcon />
                </Tooltip>
              </DevueltoContainer>
            )}
          </Td>
        </>
      ) : null}
    </Tr>
  );
};
export default MiRetiroCard;

const Tr = styled.tr`
  display: flex;
  justify-content: space-between;
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
  width: 25%;
  gap: 5%;
`;

const DevueltoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
