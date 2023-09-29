import styled from "styled-components";

const Loading = () => {
  return (
    <LoadingContainer>
      <LoadingImg src="src/assets/icons/book-loading.gif" />
      <H2>Tomando nota...</H2>
    </LoadingContainer>
  );
};

export default Loading;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  margin: auto;
  align-items: center;
`;

const LoadingImg = styled.img`
  width: 40%;
`;

const H2 = styled.h2`
  width: 100%;
  font-size: 1.5em;
`;
