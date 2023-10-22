import * as React from "react";
import {
  Unstable_NumberInput as BaseNumberInput,
  numberInputClasses,
} from "@mui/base/Unstable_NumberInput";
import { styled } from "@mui/system";

const NumberInput = React.forwardRef(function CustomNumberInput(props, ref) {
  return (
    <BaseNumberInput
      slots={{
        root: StyledInputRoot,
        input: StyledInputElement,
        incrementButton: StyledButton,
        decrementButton: StyledButton,
      }}
      slotProps={{
        incrementButton: {
          children: "▴",
        },
        decrementButton: {
          children: "▾",
        },
      }}
      {...props}
      ref={ref}
    />
  );
});

export default function NumberInputBasic({
  fechaPublicacion,
  setFechaPublicacion,
  editar,
  setLibroData,
}) {
  React.useEffect(() => {
    editar ? setFechaPublicacion(fechaPublicacion) : setFechaPublicacion("");
  }, []);

  const handleChange = (e) => {
    setFechaPublicacion(e);
    setLibroData((prevUserData) => {
      return {
        ...prevUserData,
        fecha_publicacion: Number(e),
      };
    });
  };
  return fechaPublicacion != null ? (
    <NumberInput
      min={1800}
      max={2100}
      aria-label="Demo number input"
      placeholder="Año de publicación"
      value={fechaPublicacion}
      onChange={(event, val) => handleChange(val)}
    />
  ) : (
    <NumberInput
      min={1800}
      max={2100}
      aria-label="Demo number input"
      placeholder="Año de publicación"
      value={""}
      onChange={(event, val) => handleChange(val)}
    />
  );
}

const StyledInputRoot = styled("div")(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-weight: 400;
  border-bottom:1px solid grey;
  width:200px;
  display: grid;
  grid-template-columns: 1fr 19px;
  grid-template-rows: 1fr 1fr;
  overflow: hidden;


  

`
);

const StyledInputElement = styled("input")(
  ({ theme }) => `
  font-size: 1rem;
  font-family: inherit;
  font-weight: 400;
  line-height: 1.5;
  grid-column: 1/2;
  grid-row: 1/3;
  background: inherit;
  border: none;
  border-radius: inherit;
  padding: 8px 6px;
  outline: 0;
`
);

const StyledButton = styled("button")(
  ({ theme }) => `
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  appearance: none;
  padding: 0;
  width: 19px;
  height: 19px;
  font-family: system-ui, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  line-height: 1.2;
  border: 0;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;

  &:hover {
    background: grey[800] ;
    border-color: grey[600] ;
    cursor: pointer;
  }

  &.${numberInputClasses.incrementButton} {
    grid-column: 2/3;
    grid-row: 1/2;
  }

  &.${numberInputClasses.decrementButton} {
    grid-column: 2/3;
    grid-row: 2/3;
  }
`
);
