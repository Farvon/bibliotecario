import { useState } from "react";
import styled from "styled-components";

const Header = () => {
  const [bookSrch, setBookSrch] = useState();

  return (
    <Container>
      <H1>Bibliotecario</H1>
      <Input
        value={bookSrch}
        placeholder="Que vas a leer hoy?..."
        onChange={(e) => (setBookSrch(e.target.value), console.log(bookSrch))}
      />
    </Container>
  );
};

export default Header;

const Container = styled.div`
  width: 100vw;
`;

const H1 = styled.h1`
  margin: 0;

  font-size: 5em;
  font-family: Youth Touch DEMO;
`;

const Input = styled.input`
  display: flex;
  margin: 0 auto;
  min-width: 20vw;
  width: 50vw;
  height: 20px;
  padding: 0.5em;
  border-radius: 15px;
  font-style: italic;
`;
