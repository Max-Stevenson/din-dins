import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./shared/components/Header";
import Users from  "./user/pages/Users";
import "./App.css";

const App = () => {
  return (
  <Router>
    <Header />
    <Users />
  </Router>
  )
};

export default App;
