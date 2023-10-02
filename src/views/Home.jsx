import Body from "../components/Body";

const Home = ({ notificar }) => {
  const msj = "Hola Carola";
  const tipo = "error";

  return (
    <>
      <Body admin={false} notificar={notificar} />
    </>
  );
};

export default Home;
