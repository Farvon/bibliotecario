import { supabase } from "../client";
import Usuario from "../models/usuario";

export const crearUsuario = async (user) => {
  const { data, error } = await supabase.auth.signUp({
    email: user.email,
    password: user.password,
  });
  const nuevoUsuario = new Usuario(
    data.user.id,
    user.email,
    user.nombre,
    user.telefono,
    user.direccion,
    user.carrera,
    user.curso
  );

  const userData = nuevoUsuario.toSupabaseFormat();

  try {
    const { newData, newError } = await supabase
      .from("Usuarios")
      .insert([userData]);
    if (newError) {
      console.log(newError);
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateUsuario = async (id, user) => {
  const nuevoUsuario = new Usuario(
    id,
    user.email,
    user.nombre,
    user.telefono,
    user.direccion,
    user.carrera,
    user.curso
  );

  const userData = nuevoUsuario.toSupabaseFormat();

  try {
    const { newData, newError } = await supabase
      .from("Usuarios")
      .update([userData])
      .eq("id", id)
      .select();
    if (newError) {
      console.log(newError);
    }
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = async (user) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: user.email,
    password: user.password,
  });
  return data;
};

export const verificarSesion = async () => {
  const { data, error } = await supabase.auth.getSession();
  return data;
};

export const getUser = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
};

export const getUserById = async (id) => {
  const { data: user, error } = await supabase
    .from("Usuarios")
    .select("*")
    .eq("id", id);
  return user;
};

export const singOut = async () => {
  const { error } = await supabase.auth.signOut();
};
