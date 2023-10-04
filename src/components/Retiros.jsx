import { useState, useEffect } from "react";
import styled from "styled-components";

import {
  getReservasAprobadas,
  updateDevolucion,
} from "../backend/controllers/reservas";
import { updateInventarioDevuelto } from "../backend/controllers/libros";

const Retiros = () => {
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    getReservasAprobadas().then((data) => setReservas(data));
  }, []);

  const handleDevolucion = (id, inventario_id) => {
    updateDevolucion(id);
    updateInventarioDevuelto(inventario_id);
    const newReservas = reservas.filter((item) => item.id != id);
    setReservas(newReservas);
  };

  return (
    <Table>
      <Thead>
        <Tr>
          <Td>Alumno</Td>
          <Td>Libro</Td>
          <Td>N° Inventario</Td>
          <Td>Devuelto</Td>
        </Tr>
      </Thead>
      <tbody>
        //FALTA MODIFICAR ESTO
        {reservas.map((reserva) => (
          <Tr key={reserva.id}>
            <Td>{reserva.usuario_id}</Td>
            <Td>Libro</Td>
            <Td>{reserva.inventario_id}</Td>
            <Td>
              <button
                onClick={() =>
                  handleDevolucion(reserva.id, reserva.inventario_id)
                }
              >
                Devuelto
              </button>
            </Td>
          </Tr>
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
