import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { startLogout } from "../../redux/actions/auth";
import { State } from "../../redux/reducer/rootReducer";

const Nav = styled.nav`
  list-style-type: none;
  overflow: hidden;
  background-color: #333;
`;

const List = styled.li`
  float: left;
  /* border-right: 1px solid #bbb; */
  :last-child {
    border-right: none;
  }
`;

const Paragraf = styled.p`
  font-size: 16px;
  display: block;
  color: white;
  text-align: center;
  padding: 14px 30px;
  text-decoration: none;
`;

const ButtonLogout = styled.button`
  background-color: #04aa6d;
  cursor: pointer;
  border:1px solid black ;
  /* margin: 3px auto; */
  transition: all .3s;

  :hover {
    background-color: black;
    border:1px solid #d0d0d0 ;
  }
`;
export const Navbar = () => {
  const { name } = useSelector((state: State) => state.auth);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(startLogout());
  };

  return (
    <Nav>
      <ul>
        <List>
          <Paragraf>WELCOME</Paragraf>
        </List>
        <List>
          <Paragraf style={{ background: "#04aa6d" }}>{name}</Paragraf>
        </List>

        <List style={{ float: "right" }}>
          <ButtonLogout onClick={handleLogout}>
            <Paragraf>LogOut</Paragraf>
          </ButtonLogout>
        </List>
      </ul>
    </Nav>
  );
};
