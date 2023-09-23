class Usuario {
  constructor(id, email, nombre, telefono, direccion, activo) {
    this.id = id; // Identificador único del usuario
    this.email = email;
    this.nombre = nombre;
    this.telefono = telefono;
    this.direccion = direccion;
    this.activo = activo; // TRUE o FALSE
  }

  // Método para convertir el objeto a un formato adecuado para Supabase
  toSupabaseFormat() {
    return {
      id: this.id,
      email: this.email,
      nombre: this.nombre,
      telefono: this.telefono,
      direccion: this.direccion,
      activo: this.activo,
    };
  }

  // Método para crear un objeto a partir de datos obtenidos de Supabase
  static fromSupabaseData(data) {
    return new Usuario(
      data.id,
      data.email,
      data.nombre,
      data.telefono,
      data.direccion,
      data.activo
    );
  }
}

export default Usuario;
