import React from "react";
import { Route, Routes } from "react-router-dom";
import ToTop from "./Components/Layout/ToTop";
import Main from "./Components/Main";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/list" element={<Main />} />
      </Routes>
      <ToTop />
    </>
  );
}

export default App;
