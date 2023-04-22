import React from "react";
import "../styles/homepage.scss";

const HomePage = () => {
  return (
    <div className="homepage">
      <header className="header">
        <h1>FastNote.space</h1>
        <nav>
          <a href="#features">Features</a>
          <a href="#demo">Demo</a>
          <a href="#pricing">Pricing</a>
        </nav>
      </header>
      <section className="hero">
        <div className="hero-content">
          <h2>Knowledge Management System</h2>
          <p>Save time on taking notes and centralize your note management</p>
          <button className="btn btn-outline-dark">Get Started</button>
        </div>
      </section>
      <section className="features" id="features">
        {/* Add feature content here */}
      </section>
      <section className="demo" id="demo">
        {/* Add demo content here */}
      </section>
      <section className="pricing" id="pricing">
        {/* Add pricing content here */}
      </section>
      <footer className="footer">
        <p>&copy; 2023 FastNote.space. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;