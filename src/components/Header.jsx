import styled from "styled-components";
import { singOut } from "../backend/controllers/usuarios";

const Header = ({ loginStatus, setLoginStatus }) => {
  const handleSingOut = () => {
    singOut().then(() => {
      setLoginStatus(false);
      console.log("deslogueado");
    });
  };
  return (
    <Container>
      <H1>Bibliotecario</H1>
      {loginStatus && (
        <button onClick={() => handleSingOut()}>Cerrar Sesión</button>
      )}
    </Container>
  );
};

export default Header;

const Container = styled.div``;

const H1 = styled.h1`
  margin: 0;
  font-size: 5em;
  font-family: Youth Touch DEMO;
`;
