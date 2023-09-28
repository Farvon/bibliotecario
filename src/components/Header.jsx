import styled from "styled-components";
import { singOut } from "../backend/controllers/usuarios";
import AccountMenu from "./AccountMenu";
import { Link } from "react-router-dom";

const Header = (loginStatus, setLoginStatus) => {
  return (
    <Container>
      <H1 onClick={() => (window.location.href = "/")}>Bibliotecario</H1>

      {loginStatus && (
        <AvatarAccount>
          <AccountMenu setLoginStatus={setLoginStatus} />
        </AvatarAccount>
      )}
    </Container>
  );
};

export default Header;

const Container = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
`;

const H1 = styled.h1`
  margin: 0;
  font-size: 5em;
  font-family: Youth Touch DEMO;
  color: black;
  cursor: pointer;
`;

const AvatarAccount = styled.div`
  display: flex;
  position: absolute;
  right: 15%;
  top: 30%;
`;
