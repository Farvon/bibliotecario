import styled from "styled-components";

const Loading = () => {
  return (
    <LoadingContainer>
      <LoadingImg src="src/assets/icons/book-loading.gif" />
      <h2>Loading...</h2>
    </LoadingContainer>
  );
};

export default Loading;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100px;
  margin: auto;
  align-items: center;
`;

const LoadingImg = styled.img`
  width: 80%;
`;
