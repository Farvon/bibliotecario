import { useState, useEffect } from "react";
import styled from "styled-components";

import { getReservasByUserId } from "../backend/controllers/reservas";

import MiRetiroCard from "./MiRetiroCard";

function MisReservas({ user_id }) {
  const [misRetiros, setMisRetiros] = useState([]);
  const [misRetirosSorted, setMisRetirosSorted] = useState([]);

  useEffect(() => {
    getReservasByUserId(user_id).then(
      (data) => (setMisRetiros(data), setMisRetirosSorted(data))
    );
  }, []);

  const sortByInventario = () => {
    const retirosSorted = misRetiros.sort(
      (a, b) => a.inventario_id - b.inventario_id
    );
    setMisRetirosSorted(retirosSorted);
    console.log(misRetirosSorted);
  };

  const sortByLibro = () => {
    const retirosSorted = misRetiros.sort((a, b) => a.id - b.id);
    setMisRetirosSorted(retirosSorted);
    console.log(misRetirosSorted);
  };

  return (
    <Table>
      <Thead>
        <Tr>
          <Td onClick={() => sortByLibro()}>Libro</Td>
          <Td onClick={() => sortByInventario()}>Inventario</Td>
          <Td>Fecha de retiro</Td>
          <Td>Devolución</Td>
        </Tr>
      </Thead>
      <tbody>
        {misRetirosSorted.map((item) => (
          <MiRetiroCard key={item.id} retiro={item} />
        ))}
      </tbody>
    </Table>
  );
}

export default MisReservas;

const Table = styled.table`
  display: flex;
  flex-direction: column;
  padding: 20px;
  padding-top: 0px;
  margin: 0 auto;
  font-size: 0.8em;
  width: 80vw;
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
`;

const Td = styled.td`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25%;
`;
