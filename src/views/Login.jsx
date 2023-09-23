import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";

import { loginUser } from "../backend/controllers/usuarios";

const Login = ({ setUser, setLoginStatus }) => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

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

    loginUser(userData).then((data) => {
      data.user != null
        ? (setUser(data), console.log("Logueado"), setLoginStatus(true))
        : console.log("error de logueo");
    });
  };

  return (
    <>
      <Form>
        <Label>E-mail</Label>
        <Input
          type="email"
          name="email"
          placeholder="..."
          onChange={handleChange}
        />
        <Label>Password</Label>
        <Input
          type="password"
          name="password"
          placeholder="..."
          onChange={handleChange}
        />
        <Button type="submit" onClick={(e) => handleSubmit(e)}>
          Ingresar
        </Button>
      </Form>
      <div>
        Aun no eres usuario?
        <ButtonRegistro>
          <Link to="/singup">Regístrate</Link>
        </ButtonRegistro>
      </div>
    </>
  );
};

export default Login;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 50vw;
  margin: auto;
`;

const Input = styled.input`
  padding: 8px;
  border-radius: 10px;
  font-style: italic;
`;

const Label = styled.label`
  display: flex;
  padding: 4px;
  border-radius: 10px;
  font-style: italic;
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
