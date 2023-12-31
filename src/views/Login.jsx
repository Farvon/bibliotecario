import * as React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";

import { loginUser } from "../backend/controllers/usuarios";

//del Input
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { validateEmail } from "../validateEmail";

import useAlert from "../hooks/useAlerts";

const Login = (user) => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const { alertSuccess, alertError } = useAlert();

  const handleChange = (e) => {
    setUserData((prevUserData) => {
      return {
        ...prevUserData,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validateEmail(userData.email) && userData.password != ""
      ? loginUser(userData)
          .then((data) => {
            user.current = data;
          })
          .catch((err) => console.log(err))
          .finally(() => (window.location.href = "/"))
      : alertError("Ingrese los datos correctamente");
  };

  //del Input
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <FormContainer>
      <Form>
        <FormControl required sx={{ m: 1, width: "25ch" }} variant="outlined">
          <InputLabel htmlFor="filled-adornment-email">Email</InputLabel>
          <OutlinedInput
            onChange={handleChange}
            id="filled-adornment-email"
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
        </FormControl>
        <Button type="submit" onClick={(e) => handleSubmit(e)}>
          Ingresar
        </Button>
      </Form>
      <div>
        Aun no eres usuario?
        <Registrate>
          <Link to="/singup">Regístrate</Link>
        </Registrate>
      </div>
      <div>
        <Olvide>
          <Link to="/recover">Olvidé mi contraseña</Link>
        </Olvide>
      </div>
    </FormContainer>
  );
};

export default Login;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 100vw;
  align-items: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 50vw;
  margin: auto;
  align-items: center;
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

const Registrate = styled.a`
  margin-left: 10px;
  font-size: 1.1em;
  font-weight: bold;

  &:hover {
    text-shadow: 1px 1px 5px lightblue;
    font-style: italic;
  }
`;

const Olvide = styled.a`
  display: flex;
  font-size: 0.8em;
  padding-top: 6px;
  font-style: italic;

  &:hover {
    font-weight: bold;
  }
`;
