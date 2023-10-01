import { useEffect, useState } from "react";

import { getDisponibles } from "../backend/controllers/libros";
import BasicTabs from "../components/BasicTabs";

const Admin = () => {
  const [showedPanel, setShowedPanel] = useState({});
  useEffect(() => {
    getDisponibles(/*libro_id*/ 73).then((data) =>
      console.log("disponible ", data)
    );

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
      <BasicTabs />
    </>
  );
};

export default Admin;
