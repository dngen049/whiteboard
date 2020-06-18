import React from "react";
import { hot } from "react-hot-loader";
import "./App.css";

const App = (props) => {
  return (
    <div className="AppContainer">
      <h1>Hello world</h1>
    </div>
  );
};

export default hot(module)(App);
