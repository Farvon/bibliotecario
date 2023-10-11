import { useState, useEffect } from "react";
import styled from "styled-components";

import { getReservasAprobadasByUserId } from "../backend/controllers/reservas";

import MiRetiroCard from "./MiRetiroCard";

function MisReservas({ user_id }) {
  const [misRetiros, setMisRetiros] = useState([]);
  const [misRetirosSorted, setMisRetirosSorted] = useState([]);
  const [sortedFecha, setSortedFecha] = useState(true);
  const [sortedDevo, setSortedDevo] = useState(true);

  useEffect(() => {
    getReservasAprobadasByUserId(user_id).then(
      (data) => (setMisRetiros(data), setMisRetirosSorted(data))
    );
  }, []);

  const sortByFecha = () => {
    const retirosSorted = sortedFecha
      ? misRetiros.toSorted((a, b) => {
          return b.fecha_retiro
            .toString()
            .localeCompare(a.fecha_retiro.toString());
        })
      : misRetiros.toSorted((a, b) => {
          return a.fecha_retiro
            .toString()
            .localeCompare(b.fecha_retiro.toString());
        });
    setMisRetirosSorted(retirosSorted);
    setSortedFecha(!sortedFecha);
  };

  const sortByEstado = () => {
    const retirosSorted = sortedDevo
      ? misRetiros.toSorted((a, b) => {
          return b.devuelto.toString().localeCompare(a.devuelto.toString());
        })
      : misRetiros.toSorted((a, b) => {
          return a.devuelto.toString().localeCompare(b.devuelto.toString());
        });
    setMisRetirosSorted(retirosSorted);
    setSortedDevo(!sortedDevo);
  };

  return (
    <Table>
      <Thead>
        <Tr>
          <Td>Libro</Td>
          <Td>Inventario</Td>
          <TdSort onClick={() => sortByFecha()}>
            Fecha de retiro {sortedFecha ? "⮟" : "⮝"}
          </TdSort>
          <TdSort onClick={() => sortByEstado()}>
            Devolución{sortedDevo ? "⮟" : "⮝"}
          </TdSort>
          <Td>Estado</Td>
        </Tr>
      </Thead>
      <tbody>
        {misRetirosSorted.map((item) => (
          <>
            <MiRetiroCard key={item.id} retiro={item} />
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
  width: 70vw;
`;

const Thead = styled.thead``;

const Tr = styled.tr`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  padding-bottom: 0px;
  margin: 10px;
  font-size: 1.4vw;
  font-weight: bold;
`;

const Td = styled.td`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20%;
`;

const TdSort = styled.td`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20%;
  cursor: pointer;
`;
