import { supabase } from "../client";

// Controladores de tabla Libros
export const getLibros = async () => {
  const { data: libros, error } = await supabase.from("Libros").select("*");
  return [error, libros];
};

// Controladores de tabla Autores
export const getAutores = async () => {
  const { data: Autores, error } = await supabase.from("Autores").select("*");
  return [error, Autores];
};

export const getAutoresById = async (autor_id) => {
  const { data: AutorById, error } = await supabase
    .from("Autores")
    .select("nombre")
    .eq("id", autor_id);
  return [AutorById, error];
};

// Controladores de tabla Inventario
export const getInventario = async (libro_id) => {
  const { data: Inventario, error } = await supabase
    .from("Inventario")
    .select("*")
    .eq("libro_id", libro_id);
  return Inventario;
};

export const getDisponibles = async (libro_id) => {
  const { data, count } = await supabase
    .from("Inventario")
    .select("*", { count: "exact" })
    .eq("libro_id", libro_id)
    .eq("reservado", false);
  return count;
};

export const updateInventario = async (id) => {
  const { data, error } = await supabase
    .from("Inventario")
    .update({ reservado: true })
    .eq("id", id)
    .select();
};
