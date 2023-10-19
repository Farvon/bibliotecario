import { useState, useEffect } from "react";
import styled from "styled-components";

import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import ContactPageRoundedIcon from "@mui/icons-material/ContactPageRounded";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import DoNotDisturbAltRoundedIcon from "@mui/icons-material/DoNotDisturbAltRounded";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import UsuarioCard from "./UsuarioCard";

import { deleteReserva, updateReserva } from "../backend/controllers/reservas";
import { getUserById } from "../backend/controllers/usuarios";
import {
  getInventarioById,
  getLibrosById,
  updateInventarioUndo,
  getCarreras,
} from "../backend/controllers/libros";

const ReservaCard = ({
  reserva,
  reservas,
  setReservas,
  showAcciones,
  setShowAcciones,
}) => {
  const [userById, setUserById] = useState();
  const [inventarioById, setInventarioById] = useState();
  const [libroById, setLibroById] = useState();
  const [carreras, setCarreras] = useState();
  const [carreraUsr, setCarreraUsr] = useState([]);
  const [showCard, setShowCard] = useState(false);

  useEffect(() => {
    getInventarioById(reserva.inventario_id).then((data2) =>
      getLibrosById(data2[0].libro_id).then((data3) => {
        setInventarioById(data2[0]), setLibroById(data3[0]);
      })
    );
    getCarreras().then((item) => setCarreras(item[1]));
    carreras &&
      libroById &&
      setCarreraUsr(carreras.find((item) => item.id == libroById.carrera_id));

    getUserById(reserva.usuario_id).then((data) => setUserById(data[0]));
  }, [carreras]);

  const handleClick = () => {
    setShowCard(true);
    setShowAcciones(false);
  };

  const handleClose = () => {
    setShowCard(false);
    setShowAcciones(true);
  };

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
      {userById && inventarioById && libroById && carreras ? (
        <>
          <TdAlumno onClick={() => handleClick()}>
            <Tooltip title="Info" placement="top" arrow>
              <IconButton
                color="warning"
                sx={{ display: !showAcciones ? "none" : null }}
              >
                <ContactPageRoundedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            {userById.nombre}
          </TdAlumno>
          <Td>{libroById.titulo}</Td>
          <Td>{inventarioById.inventario}</Td>
          <Td>{carreraUsr.carrera}</Td>
          <Td>
            <Tooltip title="Aprobar" placement="top" arrow>
              <IconButton
                sx={{ display: !showAcciones ? "none" : null }}
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
                sx={{ display: !showAcciones ? "none" : null }}
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
          {showCard ? (
            <UsuarioCard
              user={userById}
              onCloseIconClick={() => handleClose()}
              carreras={carreras}
            />
          ) : null}
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

  @media (max-width: 767px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;
const Td = styled.td`
  display: flex;
  justify-content: center;
  width: 25%;
  gap: 5%;

  @media (max-width: 767px) {
    width: 100%;
    border-top: 1px solid #eeeeee;
    margin-bottom: 10px;

    &:nth-child(2) {
      padding-top: 10px;
    }
  }
`;

const TdAlumno = styled.td`
  display: flex;
  justify-content: left;
  font-size: 100%;
  align-items: center;
  width: 20%;
  gap: 5%;

  @media (max-width: 767px) {
    justify-content: center;
    width: 100%;
  }
`;
