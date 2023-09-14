import styled from "styled-components";

const Header = () => {
  return (
    <Container>
      <H1>Bibliotecario</H1>
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
