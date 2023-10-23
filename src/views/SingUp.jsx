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
import { validateEmail } from "../validateEmail";

const SingUp = ({ setLoading }) => {
  const { alertSuccess, alertError } = useAlert();
  const [igual, setIgual] = useState(true);
  const [invalidNombre, setInvalidNombre] = useState(false);
  const [invalidTelefono, setInvalidTelefono] = useState(false);
  const [invalidDireccion, setInvalidDireccion] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);

  const [invalidEmail, setInvalidEmail] = useState(false);
  const [userData, setUserData] = useState({
    nombre: "",
    email: "",
    password: "",
    telefono: "",
    direccion: "",
  });

  const handleChange = (e) => {
    setInvalidNombre(false);
    setInvalidEmail(false);
    setInvalidTelefono(false);
    setInvalidDireccion(false);
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

    userData.nombre == "" && setInvalidNombre(true);
    userData.telefono == "" && setInvalidTelefono(true);
    userData.direccion == "" && setInvalidDireccion(true);
    userData.password == "" && setInvalidPassword(true);

    !validateEmail(userData.email) && setInvalidEmail(true);

    validateEmail(userData.email) &&
    igual &&
    userData.nombre != "" &&
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
            sx={{
              border: invalidNombre && "1px solid red",
              borderRadius: invalidNombre && "6px",
            }}
            onChange={handleChange}
            id="outlined-adornment-nombre"
            type="text"
            label="Nombre"
            name="nombre"
          />
          {invalidNombre && (
            <FormHelperText
              sx={{ color: "red" }}
              id="outlined-adornment-password"
            >
              *Campo Obligatorio
            </FormHelperText>
          )}
        </FormControl>
        <FormControl
          required
          sx={{
            m: 1,
            width: "25ch",
          }}
          variant="outlined"
        >
          <InputLabel htmlFor="outline-adornment-email">Email</InputLabel>
          <OutlinedInput
            sx={{
              border: invalidEmail && "1px solid red",
              borderRadius: invalidEmail && "6px",
            }}
            onChange={handleChange}
            id="outline-adornment-email"
            type="email"
            label="Email"
            name="email"
          />
          {invalidEmail && (
            <FormHelperText
              sx={{ color: "red" }}
              id="outlined-adornment-password"
            >
              *Email Invalido
            </FormHelperText>
          )}
        </FormControl>

        <FormControl required sx={{ m: 1, width: "25ch" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Contraseña
          </InputLabel>
          <OutlinedInput
            sx={{
              border: invalidPassword && "1px solid red",
              borderRadius: invalidPassword && "6px",
            }}
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
          {invalidPassword ? (
            <FormHelperText
              sx={{ color: "red" }}
              id="outlined-adornment-password"
            >
              *Campo Obligatorio
            </FormHelperText>
          ) : (
            <FormHelperText id="outlined-adornment-password">
              *mínimo 6 caracteres
            </FormHelperText>
          )}
        </FormControl>
        <FormControl required sx={{ m: 1, width: "25ch" }} variant="outlined">
          <InputLabel
            sx={{ color: !igual ? "red" : null }}
            htmlFor="outlined-adornment-password"
          >
            Contraseña
          </InputLabel>
          <OutlinedInput
            sx={{
              color: !igual ? "red" : null,
              border: invalidPassword && "1px solid red",
              borderRadius: invalidPassword && "6px",
            }}
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
            sx={{
              border: invalidTelefono && "1px solid red",
              borderRadius: invalidTelefono && "6px",
            }}
            onChange={handleChange}
            id="outlined-adornment-telefono"
            type="number"
            label="Teléfono"
            name="telefono"
          />
          {invalidTelefono && (
            <FormHelperText
              sx={{ color: "red" }}
              id="outlined-adornment-password"
            >
              *Campo Obligatorio
            </FormHelperText>
          )}
        </FormControl>
        <FormControl required sx={{ m: 1, width: "25ch" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-direccion">
            Dirección
          </InputLabel>
          <OutlinedInput
            sx={{
              border: invalidDireccion && "1px solid red",
              borderRadius: invalidDireccion && "6px",
            }}
            onChange={handleChange}
            id="outlined-adornment-direccion"
            type="text"
            label="Dirección"
            name="direccion"
          />
          {invalidDireccion && (
            <FormHelperText
              sx={{ color: "red" }}
              id="outlined-adornment-password"
            >
              *Campo Obligatorio
            </FormHelperText>
          )}
        </FormControl>

        <Button type="submit" onClick={(e) => handleSubmit(e)}>
          Crear Usuario
        </Button>
      </FormContainer>
      <div>
        <Volver>
          <Link to="/">Volver</Link>
        </Volver>
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
  justify-content: center;
  align-items: center;
  font-size: 1em;
  margin-bottom: 20px;
  margin-top: 20px;
  width: 220px;
  background: lightblue;
  border: none;
  box-shadow: 2px 2px 3px #c5c5c5, -6px -6px 12px #ffffff;

  &:hover {
    background: #c8dcdf;
  }
`;

const Volver = styled.a`
  margin-left: 10px;
  font-size: 1em;
  font-weight: bold;

  &:hover {
    text-shadow: 1px 1px 5px lightblue;
    font-style: italic;
  }
`;
