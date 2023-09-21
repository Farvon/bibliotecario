import { supabase } from "../client";

export const crearUsuario = async (user) => {
  const { data, error } = await supabase.auth.signUp({
    email: user.email,
    password: user.password,
    options: {
      data: {
        nombre: user.nombre,
        edad: 27,
        direccion: "siempre viva",
      },
    },
  });
};
