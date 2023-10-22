import * as React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";

import { forgotPassword } from "../backend/controllers/usuarios";

//del Input
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";

import useAlert from "../hooks/useAlerts";

const Recover = () => {
  const [email, setEmail] = useState("");
  const { alertSuccess, alertError } = useAlert();

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    email != ""
      ? forgotPassword(email)
          .then((data) => alertSuccess("Email enviado"))
          .then(() => timeout(2000))
          .then(() => (window.location.href = "/"))
      : alertError("Ingrese un email válido");
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

        <Button type="submit" onClick={(e) => handleSubmit(e)}>
          Enviar Email
        </Button>
      </Form>
    </FormContainer>
  );
};

export default Recover;

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
