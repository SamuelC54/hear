// @flow
import React, { useState } from "react";
import renderIf from "render-if";
import styled, { css } from "styled-components";
import useReactRouter from "use-react-router";

import logo from "../assets/logo.png";
import userHeader from "../assets/userHeader.png";

const Root = styled.div`
  background: rgba(248, 248, 248, 1);
  position: relative;
  width: 100%;
  height: 100%;
  font-family: "Roboto";
`;
const Spacer = styled.div`
  flex: 1;
`;

const Logo = styled.div`
  font-size: 25px;
`;

const Row = styled.div`
  width: 100%;
  display: flex;
`;

const Content = styled.div``;

const Header = styled.div`
  height: 194px;
  display: flex;
  align-items: flex-start;
  padding: 40px 165px 40px 165px;
  background: #6a79dd;
  flex-direction: column;
`;

const Button = styled.button`
  padding: 0 36px;
  height: 36px;
  border-radius: 18px;
  border: none;
  background: none;
  cursor: pointer;
  ${props =>
    props.selected &&
    css`
      background: rgba(255, 255, 255, 0.15);
    `}
  ${props =>
    !props.selected &&
    css`
      &:hover {
        background: rgba(255, 255, 255, 0.05);
      }
    `}
  &:active {
    background: rgba(255, 255, 255, 0.15);
  }
  &:focus {
    outline: none;
  }
  color: white;
  font-family: Poppins;
  font-size: 14px;
  white-space: nowrap;
`;

export default function Template({ children }: any) {
  const { history } = useReactRouter();

  const redirect = (path: string) => () => {
    console.log("path", path);
    history.push(path);
  };

  return (
    <Root>
      <Header>
        <Row>
          <img src={logo} />
          <Spacer />
          <img src={userHeader} />
        </Row>
        <Spacer />
        <Row>
          <Button
            selected={history.location.pathname === "/"}
            onClick={() => history.push("/")}
          >
            Search
          </Button>
          <Button
            selected={history.location.pathname === "/inventory"}
            onClick={() => history.push("/")}
          >
            Inventory
          </Button>
          <Button
            selected={history.location.pathname === "/dashboard"}
            onClick={() => history.push("/dashboard")}
          >
            Dashboard
          </Button>
        </Row>
      </Header>
      <Content>{children}</Content>
    </Root>
  );
}
