// Crear una instancia de la fuente
const font = new FontFace("MiFuente", "url(./fonts/mifuente.ttf)");

// Cargar la fuente
font.load().then(function () {
  document.fonts.add(font);
  // Aquí puedes aplicar la fuente a tus elementos
});
