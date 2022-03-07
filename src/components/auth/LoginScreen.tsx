import { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { startLogin } from "../../redux/actions/auth";

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
  margin: 10px;
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

export const LoginScreen = () => {
  const dispatch = useDispatch();

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const { email, password } = loginForm;

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(startLogin(email, password));
  };

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setLoginForm((prev) => ({ ...prev, [target.name]: target.value }));
  };

  return (
    <Conteiner>
      <FormContainer onSubmit={(e) => handleLogin(e)}>
        <Container>
          <Title>Login</Title>

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
            <LabelText htmlFor="password">Password</LabelText>
            <InputText
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => handleChange(e)}
              placeholder="password longer than 6 digits..."
            />
          </FormInput>
          <Button type="submit">Log In</Button>
          <Link style={{display:'flex',flexDirection:'column'}} to={"/login/newUser"}>
            <ButtonBack>Create New Account</ButtonBack>
          </Link>
        </Container>
      </FormContainer>
    </Conteiner>
  );
};
