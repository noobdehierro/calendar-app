import React, { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import validator from "validator";
import { startRegister } from "../../redux/actions/auth";

const Conteiner = styled.div`
  background-image: radial-gradient(
    circle,
    #051937,
    #003b60,
    #00617b,
    #00867e,
    #04aa6d
  );
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FormContainer = styled.form`
  background-color: #00000065;
  width: 20%;
  border-radius: 20px;
  border: 1px solid white;
`;
const Title = styled.h1`
  color: white;
  font-size: 40px;
  align-self: center;
  margin: 20px;
`;

const Container = styled.div`
  margin: 20px;
  display: flex;
  flex-direction: column;
  color: white;
  /* align-items: stretch; */
`;

const FormInput = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LabelText = styled.label`
  font-size: large;
  margin: 5px;
`;

const InputText = styled.input`
  width: 50%;
  margin: 10px;
  padding: 5px;
  border: none;
  border-radius: 10px;
  transition: all 0.3s;
  /* text-align: center; */

  :focus {
    outline: none;
    width: 60%;
    transition: all 0.3s;
    ::placeholder {
      text-align: center;
      /* font-size: xx-small; */
    }
  }
`;

const Button = styled.button`
  width: 90%;
  align-self: center;
  margin: 15px 10px;
  border-radius: 10px;
  border: 1px solid white;
  cursor: pointer;
  padding: 5px;
  transition: all 0.3s;

  :hover {
    background-color: #00000065;
    color: white;
    border: 1px solid white;
  }
`;

const ButtonBack = styled.button`
  width: 50%;
  align-self: center;
  margin: 15px 10px;
  border-radius: 10px;
  border: 1px solid white;
  cursor: pointer;
  padding: 5px;
  transition: all 0.3s;

  :hover {
    background-color: #00000065;
    color: white;
    border: 1px solid white;
  }
`;

export const Register = () => {

  const dispatch = useDispatch()

  const [registerForm, setRegisterForm] = useState({
    name: "nacho libre",
    email: "nachito@hotmail.com",
    password1: "123456",
    password2: "123456",
  });

  const { name, email, password1, password2 } = registerForm;

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setRegisterForm((prev) => ({ ...prev, [target.name]: target.value }));
  };

  const handleSubmitRegister = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validator.isLength(name, { min: 3 })) {
      console.log("the name is required or very short");
      return;
    }
    if (!validator.isEmail(email)) {
      console.log("email no valid");
      return;
    }

    if (!validator.isLength(password1, { min: 6 })) {
      console.log('password very short');
      return;
    }
    if (password1 !== password2) {
      console.log('password dont match')
      return;
    }
    dispatch(startRegister({name,password:password1,email}))
    console.log(registerForm);
  };
  return (
    <Conteiner>
      <FormContainer onSubmit={(e) => handleSubmitRegister(e)}>
        <Container>
          <Title>Sign Up</Title>
          <FormInput>
            <LabelText htmlFor="name">Name</LabelText>
            <InputText
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={(e) => handleChange(e)}
              placeholder="rogelio, mariana, fred..."
            />
          </FormInput>
          <FormInput>
            <LabelText htmlFor="email">Email</LabelText>
            <InputText
              type="text"
              name="email"
              id="email"
              value={email}
              onChange={(e) => handleChange(e)}
              placeholder="ejemplo@dominio.com"
            />
          </FormInput>
          <FormInput>
            <LabelText htmlFor="password1">Password</LabelText>
            <InputText
              type="password"
              name="password1"
              id="password1"
              value={password1}
              onChange={(e) => handleChange(e)}
              placeholder="password longer than 6 digits..."
            />
          </FormInput>
          <FormInput>
            <LabelText htmlFor="password2">Confirm Password</LabelText>
            <InputText
              type="password"
              name="password2"
              id="password2"
              value={password2}
              onChange={(e) => handleChange(e)}
              placeholder="Confirm Password"
            />
          </FormInput>
          <Button type="submit">Sign Up</Button>
          <Link
            style={{ display: "flex", flexDirection: "column" }}
            to={"/login"}
          >
            <ButtonBack>Log In</ButtonBack>
          </Link>
        </Container>
      </FormContainer>
    </Conteiner>
  );
};
