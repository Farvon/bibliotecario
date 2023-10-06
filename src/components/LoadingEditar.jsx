import styled from "styled-components";

function LoadingEditar() {
  return (
    <ImgContainer>
      <Img src="./editar-loading.gif" />
    </ImgContainer>
  );
}

export default LoadingEditar;

const ImgContainer = styled.div`
  display: flex;
  margin: auto;
  margin-top: 10%;
  width: 50px;
`;

const Img = styled.img`
  width: 50%;
`;
