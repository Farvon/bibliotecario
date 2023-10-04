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

export const getReservasNuevas = async () => {
  const { data: newData, newError } = await supabase
    .from("Reservas")
    .select("*")
    .eq("aprobado", false);

  return newData;
};

export const getReservasAprobadas = async () => {
  const { data: newData, newError } = await supabase
    .from("Reservas")
    .select("*")
    .eq("aprobado", true);
  return newData;
};

export const updateReserva = async (id) => {
  const { data, error } = await supabase
    .from("Reservas")
    .update({ aprobado: true })
    .eq("id", id)
    .select();
};

export const updateDevolucion = async (id) => {
  const { data, error } = await supabase
    .from("Reservas")
    .update({ devuelto: true })
    .eq("id", id)
    .select();
};

export const deleteReserva = async (id) => {
  const { error } = await supabase.from("Reservas").delete().eq("id", id);
};
