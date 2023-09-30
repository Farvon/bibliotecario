import { supabase } from "../client";

export const getLibros = async () => {
  const { data: libros, error } = await supabase.from("Libros").select("*");
  return [error, libros];
};

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

export const getDisponibles = async (libro_id) => {
  const { data, count } = await supabase
    .from("Inventario")
    .select("*", { count: "exact" })
    .eq("libro_id", libro_id);
  return count;
};
