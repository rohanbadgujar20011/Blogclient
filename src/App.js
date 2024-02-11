import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Allroute from "./Allroute";
import NavComp from "./Component/NavComp";
import React from "react";
function App() {
  return (
    <React.Fragment>
      <div className="App">
        <Router>
          <NavComp />
          <Allroute />
        </Router>
      </div>
    </React.Fragment>
  );
}

export default App;
