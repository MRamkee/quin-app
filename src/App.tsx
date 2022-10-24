// © Copyright 2022 Ramkee-Mukuru Quin-App

import React from "react";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";

import "./App.css";
import Navbar from "./navBar";

const AppWrapper = () => {
  let routes = useRoutes([{ path: "/", element: <Navbar /> }]);
  return routes;
};

const App = () => {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
};

export default App;
