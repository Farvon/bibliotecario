import { supabase } from "../client";
import Reserva from "../models/reserva";

export const crearReserva = async (reserva) => {
  const nuevaReserva = new Reserva(
    reserva.usuario_id,
    reserva.inventario_id,
    reserva.fecha_retiro,
    reserva.fecha_devolucion,
    false
  );

  const reservaData = nuevaReserva.toSupabaseFormat();

  try {
    const { newData, newError } = await supabase
      .from("Reservas")
      .insert([reservaData]);
    if (newError) {
      console.log(newError);
    }
  } catch (error) {
    console.log(error);
  }
};
