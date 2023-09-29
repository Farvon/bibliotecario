import Body from "../components/Body";

const Home = ({ notificar }) => {
  const msj = "Hola Carola";
  const tipo = "error";

  return (
    <>
      <Body />
      <button onClick={() => notificar(msj, tipo)}>Notificar</button>
    </>
  );
};

export default Home;
