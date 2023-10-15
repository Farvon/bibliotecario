class Libro {
  constructor(
    titulo,
    autor_id,
    editorial,
    lugar,
    cantidad,
    paginas,
    fecha_publicacion,
    isbn,
    carrera_id
  ) {
    this.titulo = titulo; // Título del libro
    this.autor_id = autor_id; // Autor del libro
    this.editorial = editorial;
    this.lugar = lugar;
    this.cantidad = cantidad;
    this.paginas = paginas;
    this.fecha_publicacion = fecha_publicacion; // Año de publicación del libro
    this.isbn = isbn;
    this.carrera_id = carrera_id;
  }

  // Método para convertir el objeto Libro a un formato adecuado para Supabase
  toSupabaseFormat() {
    return {
      titulo: this.titulo,
      autor_id: this.autor_id,
      editorial: this.editorial,
      lugar: this.lugar,
      cantidad: this.cantidad,
      paginas: this.paginas,
      fecha_publicacion: this.fecha_publicacion,
      isbn: this.isbn,
      carrera_id: this.carrera_id,
    };
  }

  // Método para crear un objeto Libro a partir de datos obtenidos de Supabase
  static fromSupabaseData(data) {
    return new Libro(
      data.titulo,
      data.autor_id,
      data.editorial,
      data.lugar,
      data.cantidad,
      data.paginas,
      data.fecha_publicacion,
      data.isbn,
      data.carrera_id
    );
  }
}

export default Libro;
