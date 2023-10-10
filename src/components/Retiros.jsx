import { useState, useEffect } from "react";
import styled from "styled-components";

import { getReservasAprobadas } from "../backend/controllers/reservas";
import RetiroCard from "./RetiroCard";

const Retiros = () => {
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    getReservasAprobadas().then((data) => setReservas(data));
  }, []);

  return (
    <Table>
      <Thead>
        <Tr>
          <Td>Alumno</Td>
          <Td>Libro</Td>
          <Td>N° Inventario</Td>
          <Td>Fecha de Retiro</Td>
          <Td>Estado</Td>
          <Td>Recibir</Td>
        </Tr>
      </Thead>
      <tbody>
        {reservas.map((item) => (
          <RetiroCard
            key={item.id}
            reserva={item}
            reservas={reservas}
            setReservas={setReservas}
          />
        ))}
      </tbody>
    </Table>
  );
};

export default Retiros;

const Table = styled.table`
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin: 0 auto;
  font-size: 0.8em;
  width: 80vw;
`;

const Thead = styled.thead``;

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
