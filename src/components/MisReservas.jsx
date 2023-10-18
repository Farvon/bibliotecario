import { useState, useEffect } from "react";
import styled from "styled-components";

import { getReservasNuevas } from "../backend/controllers/reservas";

import MiReservaCard from "./MiReservaCard";

function MisReservas({ user_id }) {
  const [misReservas, setMisReservas] = useState([]);
  const [misReservasSorted, setMisReservasSorted] = useState([]);

  useEffect(() => {
    getReservasNuevas(user_id).then(
      (data) => (
        setMisReservas(data),
        setMisReservasSorted(data.filter((item) => item.usuario_id == user_id))
      )
    );
  }, []);

  return (
    <Table>
      <Thead>
        <Tr>
          <Td>Libro</Td>
          <Td>Inventario</Td>
          <Td>Cancelar</Td>
        </Tr>
      </Thead>
      <tbody>
        {misReservasSorted.map((item, index) => (
          <>
            <MiReservaCard
              key={index}
              reserva={item}
              misReservas={misReservas}
              setMisReservas={setMisReservas}
            />
          </>
        ))}
      </tbody>
    </Table>
  );
}

export default MisReservas;

const Table = styled.table`
  display: flex;
  flex-direction: column;
  padding: 10px;
  padding-top: 0px;
  margin: 0 auto;
  font-size: 0.8em;
  width: 40vw;
  @media (max-width: 767px) {
    width: 90vw;
  }
`;

const Thead = styled.thead``;

const Tr = styled.tr`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  padding-bottom: 0px;
  margin: 10px;
  font-size: 1.2em;
  font-weight: bold;

  @media (max-width: 767px) {
    font-size: 1em;
  }
`;

const Td = styled.td`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
`;
