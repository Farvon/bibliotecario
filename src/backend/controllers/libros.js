import { supabase } from "../client";
import Libro from "../models/libro";

// Controladores de tabla Libros
export const getLibros = async () => {
  const { data: libros, error } = await supabase.from("Libros").select("*");
  return [error, libros];
};

export const getLibrosById = async (id) => {
  const { data: libro, error } = await supabase
    .from("Libros")
    .select("*")
    .eq("id", id);

  return libro;
};

export const crearLibro = async (libro) => {
  const nuevoLibro = new Libro(
    libro.titulo,
    libro.autor_id,
    libro.editorial,
    libro.lugar,
    libro.cantidad,
    libro.paginas,
    libro.fecha_publicacion,
    libro.isbn
  );

  const libroData = nuevoLibro.toSupabaseFormat();

  try {
    const { newData, newError } = await supabase
      .from("Libros")
      .insert([libroData]);
    if (newError) {
      console.log(newError);
    }
  } catch (error) {
    console.log(error);
  }
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

export const postNewAutor = async (autor) => {
  const { data, error } = await supabase
    .from("Autores")
    .insert({ nombre: autor })
    .select();
  console.log(data, error);
};

// Controladores de tabla Inventario
export const getInventario = async (libro_id) => {
  const { data: Inventario, error } = await supabase
    .from("Inventario")
    .select("*")
    .eq("libro_id", libro_id);
  return Inventario;
};

export const getInventarioById = async (id) => {
  const { data: Inventario, error } = await supabase
    .from("Inventario")
    .select("*")
    .eq("id", id);
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

export const updateInventarioUndo = async (id) => {
  const { data, error } = await supabase
    .from("Inventario")
    .update({ reservado: false })
    .eq("id", id)
    .select();
};

export const updateInventarioDevuelto = async (id) => {
  const { data, error } = await supabase
    .from("Inventario")
    .update({ reservado: false })
    .eq("id", id)
    .select();
};
