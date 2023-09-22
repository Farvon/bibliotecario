import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const LibroCard = ({ onCloseIconClick, libro, autor }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        onCloseIconClick();
      }
    };

    // Bind and unbind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <Backdrop>
        <CardContainer ref={cardRef}>
          <CardForm>
            <FormImg src="src\assets\icons\book.png" />
            <FormInfo>
              <Titulo>{libro.titulo}</Titulo>
              <Info>
                <Etiqueta>Autor:</Etiqueta>
                <InfoLibro> {autor}</InfoLibro>
              </Info>
              <Info>
                <Etiqueta>Editorial:</Etiqueta>
                <InfoLibro> {libro.editorial}</InfoLibro>
              </Info>
              <Info>
                <Etiqueta>Año de publicación:</Etiqueta>
                <InfoLibro> {libro.fecha_publicacion}</InfoLibro>
              </Info>
              <Info>
                <Etiqueta>Lugar de publicación:</Etiqueta>
                <InfoLibro> {libro.lugar}</InfoLibro>
              </Info>
              <Info>
                <Etiqueta>Cant. de páginas:</Etiqueta>
                <InfoLibro> {libro.paginas}</InfoLibro>
              </Info>
              <Info>
                <Etiqueta>I.S.B.N:</Etiqueta>
                <InfoLibro> {libro.isbn}</InfoLibro>
              </Info>
              <Info>
                <Etiqueta>Disponibles en biblioteca:</Etiqueta>
                <InfoLibro> {libro.cantidad}</InfoLibro>
              </Info>
            </FormInfo>
          </CardForm>
          <CardButtons>
            <ReservarButton>Reservar</ReservarButton>
            <CloseButton onClick={() => onCloseIconClick()}>
              Cancelar
            </CloseButton>
          </CardButtons>
        </CardContainer>
      </Backdrop>
    </>
  );
};

export default LibroCard;

const Backdrop = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.7);
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: auto;
  background: #fff;
  border-radius: 8px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  padding: 18px 0px;
  width: auto;
`;

const CardForm = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin: auto;
`;

const FormImg = styled.img`
  display: flex;
  width: 40%;
`;

const FormInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Titulo = styled.span`
  font-weight: bold;
  font-size: 1.5em;
  margin-bottom: 8px;
  max-width: 40vw;
`;

const Info = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 12px;
`;

const Etiqueta = styled.span`
  font-weight: bold;
  margin-right: 10px;
`;

const InfoLibro = styled.span`
  display: flex;
  margin: 0;
`;

const CardButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 100%;
`;
const ReservarButton = styled.button`
  width: 20%;
  background: lightblue;
  border: none;
  box-shadow: 2px 2px 3px #c5c5c5, -6px -6px 12px #ffffff;
`;

const CloseButton = styled.button`
  width: 20%;
  background: pink;
  border: none;
  box-shadow: 2px 2px 3px #c5c5c5, -6px -6px 12px #ffffff;
`;
