import React from "react";
import { createGlobalStyle } from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Calendar from "./Pages/Calendar";
import Modal from "./Components/Modal/Modal";

import { TodoProvider } from "./TodoProvider";

const GlobalStyled = createGlobalStyle`
  *{
    margin: 0;
    padding : 0;
    font-family: sans-serif;
    box-sizing: border-box;
  }
  body{
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const App = () => {
  return (
    <>
      <TodoProvider>
        <GlobalStyled></GlobalStyled>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Calendar />}></Route>
          </Routes>
        </BrowserRouter>
      </TodoProvider>
    </>
  );
};

export default App;
