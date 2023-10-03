import Body from "../components/Body";

const Home = ({ user, notificar }) => {
  const msj = "Hola Carola";
  const tipo = "error";

  return (
    <>
      <Body user={user} admin={false} notificar={notificar} />
    </>
  );
};

export default Home;
