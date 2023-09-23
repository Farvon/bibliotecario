class Libro {
  constructor(id, titulo, autor_id, publicacion) {
    this.id = id; // Identificador único del libro
    this.titulo = titulo; // Título del libro
    this.autor_id = autor_id; // Autor del libro
    this.editorial = editorial;
    this.lugar = lugar;
    this.cantidad = cantidad;
    this.paginas = paginas;
    this.fecha_publicacion = fecha_publicacion; // Año de publicación del libro
    this.isbn = isbn;
  }

  // Método para convertir el objeto Libro a un formato adecuado para Supabase
  toSupabaseFormat() {
    return {
      id: this.id,
      titulo: this.titulo,
      autor_id: this.autor_id,
      editorial: this.editorial,
      lugar: this.lugar,
      cantidad: this.cantidad,
      paginas: this.paginas,
      fecha_publicacion: this.fecha_publicacion,
      isbn: this.isbn,
    };
  }

  // Método para crear un objeto Libro a partir de datos obtenidos de Supabase
  static fromSupabaseData(data) {
    return new Libro(
      data.id,
      data.titulo,
      data.autor_id,
      data.editorial,
      data.lugar,
      data.cantidad,
      data.paginas,
      data.fecha_publicacion,
      data.isbn
    );
  }
}

export default Libro;
