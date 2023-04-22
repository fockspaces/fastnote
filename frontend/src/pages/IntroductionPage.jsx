import "../styles/IntroPage/introduction-page.scss";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Section from "../components/IntroPage/Section";
import Header from "../components/IntroPage/Header";
import Navbar from "../components/IntroPage/NavBar";

const App = () => {
  return (
    <div className="App">
      <Header />
      <Navbar />
      <Section />
    </div>
  );
};

export default App;
