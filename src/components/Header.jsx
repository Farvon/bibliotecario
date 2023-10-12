import styled from "styled-components";
import AccountMenu from "./AccountMenu";
import AdminAccountMenu from "./AdminAccountMenu";
import { useState } from "react";

import Tooltip from "@mui/material/Tooltip";

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
  position: relative;
`;

const H1 = styled.h1`
  display: flex;
  margin: 0;
  font-size: 4em;
  font-family: Bibliotecario;
  color: black;
  cursor: pointer;
`;

const AvatarAccount = styled.div`
  display: flex;
  position: absolute;
  margin-top: -5px;
  right: 10vw;
  @media (max-width: 480px) {
    right: 0;
    padding: 2px;
  }
`;
