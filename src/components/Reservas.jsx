import { useState, useEffect } from "react";
import styled from "styled-components";

import { getReservasNuevas } from "../backend/controllers/reservas";
import ReservaCard from "./ReservaCard";

const Reservas = () => {
  const [reservas, setReservas] = useState([]);
  const [showAcciones, setShowAcciones] = useState(true);

  useEffect(() => {
    getReservasNuevas().then((data) => setReservas(data));
  }, []);

  return (
    <Table>
      <Thead>
        <Tr>
          <Td>Alumno</Td>
          <Td>Libro</Td>
          <Td>N° Inventario</Td>
          <Td>Carrera</Td>
          <Td>Acciones</Td>
        </Tr>
      </Thead>

      <tbody>
        {reservas.map((item) => (
          <ReservaCard
            key={item.id}
            reserva={item}
            reservas={reservas}
            setReservas={setReservas}
            showAcciones={showAcciones}
            setShowAcciones={setShowAcciones}
          />
        ))}
      </tbody>
    </Table>
  );
};

export default Reservas;

const Table = styled.table`
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin: 0 auto;
  font-size: 0.8em;
  width: 80vw;
`;

const Thead = styled.thead`
  @media (max-width: 767px) {
    display: none;
  }
`;

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
