class Usuario {
  constructor(id, email, nombre, telefono, direccion, carrera, curso) {
    this.id = id; // Identificador único del usuario
    this.email = email;
    this.nombre = nombre;
    this.telefono = telefono;
    this.direccion = direccion;
    this.carrera = carrera; // TRUE o FALSE
    this.curso = curso;
  }

  // Método para convertir el objeto a un formato adecuado para Supabase
  toSupabaseFormat() {
    return {
      id: this.id,
      email: this.email,
      nombre: this.nombre,
      telefono: this.telefono,
      direccion: this.direccion,
      carrera: this.carrera,
      curso: this.curso,
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
      data.carrera,
      data.curso
    );
  }
}

export default Usuario;
