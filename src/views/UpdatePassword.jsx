import * as React from "react";
import { useEffect, useState } from "react";
import { styled } from "styled-components";

import { getUser, updatePassword } from "../backend/controllers/usuarios";

//del Input
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import useAlert from "../hooks/useAlerts";

const UpdatePassword = () => {
  const { alertSuccess, alertError } = useAlert();

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    getUser().then((data) => setUserData({ email: data.email }));
  }, []);

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

    userData.password != ""
      ? updatePassword(userData.email, userData.password)
          .then(() => alertSuccess("Contraseña Actualizada"))
          .then(() => timeout(2000))
          .then(() => (window.location.href = "/"))
      : alertError("Ingrese una contraseña válida");
  };

  function timeout(delay) {
    return new Promise((res) => setTimeout(res, delay));
  }

  //del Input
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    userData && (
      <FormContainer>
        <Form>
          <FormControl required sx={{ m: 1, width: "25ch" }} variant="outlined">
            <InputLabel htmlFor="filled-adornment-email">Email</InputLabel>
            <OutlinedInput
              // onChange={handleChange}
              id="filled-adornment-email"
              type="text"
              label="Email"
              name="email"
              value={userData.email}
              disabled
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
            Actualizar Contraseña
          </Button>
        </Form>
      </FormContainer>
    )
  );
};

export default UpdatePassword;

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
  margin: 20px auto;
  justify-content: center;
  width: 40%;
  background: lightblue;
  border: none;
  box-shadow: 2px 2px 3px #c5c5c5, -6px -6px 12px #ffffff;
`;

const ButtonRegistro = styled.button`
  border: none;
  color: red;
  text-decoration: none;
`;
