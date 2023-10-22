import * as React from "react";
import { useState } from "react";
import { styled } from "styled-components";
import { Link } from "react-router-dom";

// Inputs
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormHelperText from "@mui/material/FormHelperText";

import { crearUsuario } from "../backend/controllers/usuarios";
import useAlert from "../hooks/useAlerts";

const SingUp = ({ setLoading }) => {
  const { alertSuccess, alertError } = useAlert();
  const [igual, setIgual] = useState(true);
  const [userData, setUserData] = useState({
    nombre: "",
    email: "",
    password: "",
    telefono: "",
    direccion: "",
  });

  const handleChange = (e) => {
    setUserData((prevUserData) => {
      return {
        ...prevUserData,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleChangePasswordRepeat = (e) => {
    e.target.value == userData.password ? setIgual(true) : setIgual(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    igual &&
    userData.nombre != "" &&
    userData.email != "" &&
    userData.password != "" &&
    userData.telefono != "" &&
    userData.direccion != ""
      ? crearUsuario(userData)
          .then(() => alertSuccess("Usuario Creado - Verifique su E-mail"))
          .then(() => timeout(2000))
          .then(() => (window.location.href = "/"))
      : alertError("Complete todos los campos correctamente");
    setLoading(false);
  };

  function timeout(delay) {
    return new Promise((res) => setTimeout(res, delay));
  }
  //Inputs
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  //-------------------------------------------------------

  return (
    <>
      <FormContainer>
        <FormControl required sx={{ m: 1, width: "25ch" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-nombre">Nombre</InputLabel>
          <OutlinedInput
            onChange={handleChange}
            id="outlined-adornment-nombre"
            type="text"
            label="Nombre"
            name="nombre"
          />
        </FormControl>
        <FormControl required sx={{ m: 1, width: "25ch" }} variant="outlined">
          <InputLabel htmlFor="outline-adornment-email">Email</InputLabel>
          <OutlinedInput
            onChange={handleChange}
            id="outline-adornment-email"
            type="text"
            label="Email"
            name="email"
          />
        </FormControl>

        <FormControl required sx={{ m: 1, width: "25ch" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Contraseña
          </InputLabel>
          <OutlinedInput
            onChange={handleChange}
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            name="password"
          />
          <FormHelperText id="outlined-adornment-password">
            *mínimo 6 caracteres
          </FormHelperText>
        </FormControl>
        <FormControl required sx={{ m: 1, width: "25ch" }} variant="outlined">
          <InputLabel
            sx={{ color: !igual ? "red" : null }}
            htmlFor="outlined-adornment-password"
          >
            Contraseña
          </InputLabel>
          <OutlinedInput
            sx={{ color: !igual ? "red" : null }}
            onChange={handleChangePasswordRepeat}
            id="outlined-adornment-password2"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            name="password_repeat"
          />
          <FormHelperText id="outlined-adornment-password2">
            *Repita la contraseña
          </FormHelperText>
        </FormControl>

        <FormControl required sx={{ m: 1, width: "25ch" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-telefono">
            Teléfono
          </InputLabel>
          <OutlinedInput
            onChange={handleChange}
            id="outlined-adornment-telefono"
            type="text"
            label="Teléfono"
            name="telefono"
          />
        </FormControl>
        <FormControl required sx={{ m: 1, width: "25ch" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-direccion">
            Dirección
          </InputLabel>
          <OutlinedInput
            onChange={handleChange}
            id="outlined-adornment-direccion"
            type="text"
            label="Dirección"
            name="direccion"
          />
        </FormControl>

        <Button type="submit" onClick={(e) => handleSubmit(e)}>
          Crear Usuario
        </Button>
      </FormContainer>
      <div>
        <ButtonRegistro>
          <Link to="/">Volver</Link>
        </ButtonRegistro>
      </div>
    </>
  );
};

export default SingUp;

const FormContainer = styled.form`
  display: flex;
  margin: auto;
  align-items: center;
  flex-direction: column;
`;
const Button = styled.button`
  display: flex;
  margin: 20px auto;
  justify-content: center;
  width: 20%;
  background: lightblue;
  border: none;
  box-shadow: 2px 2px 3px #c5c5c5, -6px -6px 12px #ffffff;
`;

const ButtonRegistro = styled.button`
  border: none;
  color: red;
  text-decoration: none;
`;
