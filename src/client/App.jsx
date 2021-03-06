import React, { useState, useEffect, useRef } from "react";
import { hot } from "react-hot-loader";

import io from "socket.io-client";

import styled from "styled-components";

import "./App.css";

import { Drawing } from "./components";

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: Red;
`;
const Wrapper = styled.section`
  display: grid;
  grid-template-rows: 10% auto;
  width: 100%;
  height: 100%;
`;
const App = (props) => {
  const [title, setTitle] = useState("Draw here");
  const socketRef = useRef();

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setTitle(data.message))
      .catch((e) => alert(e));

    socketRef.current = io({ path: "/socket" }); // -> this will connect to the proxy
    console.log(socketRef);
    socketRef.current.on("Your id", (id) => {
      console.log(id);
    });
  }, []);
  return (
    <Wrapper>
      <div>
        <Title>{title}</Title>
      </div>
      <div style={{ border: "1px solid black" }}>
        <Drawing />
      </div>
    </Wrapper>
  );
};

export default hot(module)(App);
