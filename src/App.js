import React from "react";
import { BrowserRouter } from "react-router-dom";

import Router from "./routes";
import Navbar from "./components/Navbar";

import "./scss/styles.scss";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Navbar />
        <Router />
      </BrowserRouter>
    </div>
  );
}

export default App;
