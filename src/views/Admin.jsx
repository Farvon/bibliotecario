import { useEffect, useState } from "react";

const Admin = () => {
  const [showedPanel, setShowedPanel] = useState({});
  useEffect(() => {
    setShowedPanel({
      retiro: true,
      devolucion: false,
      addLibros: false,
      addAutor: false,
    });
  }, []);

  const handleChange = (e) => {
    setShowedPanel({
      retiro: false,
      devolucion: false,
      addLibros: false,
      addAutor: false,
    });
    console.log(showedPanel);
  };
  return (
    <>
      <h2>Panel de Administración</h2>
      <button onClick={() => handleChange("retiros")}>Retiros</button>
      <button onClick={() => handleChange("devolucion")}>Devoluciones</button>
      <button onClick={() => handleChange("addLibro")}>
        Agregar/Eliminar Libro
      </button>
      <button onClick={() => handleChange("addAutor")}>
        Agregar/Eliminar Autor
      </button>
    </>
  );
};

export default Admin;
