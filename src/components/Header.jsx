import styled from "styled-components";
import AccountMenu from "./AccountMenu";
import AdminAccountMenu from "./AdminAccountMenu";
import { useEffect, useState } from "react";

const Header = ({ user }) => {
  const [admin, setAdmin] = useState(false);

  return (
    <Container>
      <H1 onClick={() => (window.location.href = "/")}>Bibliotecario</H1>

      {user != null && (
        <AvatarAccount>
          {user.email != "admin@bibliotecario.com" ? (
            <AccountMenu />
          ) : (
            <AdminAccountMenu />
          )}
        </AvatarAccount>
      )}
    </Container>
  );
};

export default Header;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const H1 = styled.h1`
  margin: 0;
  font-size: 4em;
  font-family: Bibliotecario;
  color: black;
  cursor: pointer;
`;

const AvatarAccount = styled.div`
  display: flex;
  margin-top: -5px;
`;
