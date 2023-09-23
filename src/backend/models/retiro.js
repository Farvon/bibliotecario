class Retiro {
  constructor(
    id,
    usuario_id,
    inventario_id,
    fecha_retiro,
    fecha_devolucion,
    devuelto
  ) {
    this.id = id; // Identificador único del retiro
    this.usuario_id = usuario_id; // ID del usuario que lo retira
    this.inventario_id = inventario_id; // ID del libro retirado
    this.fecha_retiro = fecha_retiro;
    this.fecha_devolucion = fecha_devolucion;
    this.devuelto = devuelto; // TRUE o FALSE
  }

  // Método para convertir el objeto a un formato adecuado para Supabase
  toSupabaseFormat() {
    return {
      id: this.id,
      usuario_id: this.usuario_id,
      inventario_id: this.inventario_id,
      fecha_retiro: this.fecha_retiro,
      fecha_devolucion: this.fecha_devolucion,
      devuelto: this.devuelto,
    };
  }

  // Método para crear un objeto a partir de datos obtenidos de Supabase
  static fromSupabaseData(data) {
    return new Retiro(
      data.id,
      data.usuario_id,
      data.inventario_id,
      data.fecha_retiro,
      data.fecha_devolucion,
      data.devuelto
    );
  }
}

export default Retiro;
