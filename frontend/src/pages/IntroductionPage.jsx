import React, { useEffect, useState } from "react";
import "../styles/introduction-page.scss";
import { useGoogleLogin } from "@react-oauth/google";
import { authGoogle } from "../api/authGoogle";
import Logo from "../components/Logo";
import { Button } from "react-bootstrap";
import { src } from "../utils/srcLink";
import { login } from "../api/login";
import ConfirmModal from "../components/ListPage/utils/ConfirmModal";
import { FaGithub, FaLinkedin, FaDocker } from "react-icons/fa";
import { MdExpandMore } from "react-icons/md";
import {
  SiAmazons3,
  SiMongodb,
  SiAmazonsqs,
  SiAwslambda,
  SiAmazonecs,
} from "react-icons/si"; // Icons for AWS Services

const initNote = localStorage.getItem("note");
const IntroductionPage = () => {
  const user = localStorage.getItem("user");
  const initNoteObj = initNote ? JSON.parse(initNote) : { _id: 1, content: "" };
  const [note, setNote] = useState(initNoteObj);
  const [content, setContent] = useState(initNoteObj.content);
  const [showModal, setShowModal] = useState(false);

  const message = {
    title: "Warning",
    body: "Your data will not be stored in guest mode. If you wish to retain your data, please consider logging in.",
    confirm: "Continue as Guest",
  };

  useEffect(() => {
    const updatedNote = { ...note, content: content };
    localStorage.setItem("note", JSON.stringify(updatedNote));
  }, [content]);

  const confirmLogin = async () => {
    if (user) return (window.location.href = "/documents");
    await login("", "guest");
  };

  // Add this function at the beginning of your IntroductionPage component
  const handleAnchorClick = (event) => {
    event.preventDefault();
    let targetElement = event.target;

    while (targetElement) {
      const href = targetElement.getAttribute("href");
      if (href) {
        const targetElement = document.querySelector(href);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth" });
        }
        break;
      }
      targetElement = targetElement.parentElement;
    }
  };

  const googleLogin = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (codeResponse) => {
      await authGoogle(codeResponse.code);
    },
    onError: (errorResponse) => console.log(errorResponse),
  });

  return (
    <div className="introduction-page">
      <header className="header">
        <Logo />
        <nav>
          <a href="#features" onClick={handleAnchorClick}>
            Features
          </a>
          <a href="#tech-skills" onClick={handleAnchorClick}>
            Tech Skills
          </a>
          <a
            href="https://github.com/fockspaces/fastnote"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/chang-feng-ming-650ba9167/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin size={24} />
          </a>
          {!user && (
            <Button
              variant="outline-dark"
              className="nav-button"
              onClick={googleLogin}
            >
              Sign in
            </Button>
          )}
        </nav>
      </header>

      <section className="hero">
        <div className="hero-content">
          <h2>Introducing Note App</h2>
          <p>The best note-taking app for all your needs.</p>
          {!user && (
            <Button
              variant="outline-dark"
              className="cta-btn"
              onClick={() => {
                setShowModal(true);
              }}
            >
              Continue as Guest
            </Button>
          )}
        </div>
        <div
          variant="outline-dark"
          className="see-more-btn"
          onClick={handleAnchorClick}
          href="#features"
        >
          <MdExpandMore size={50} color="white"/>
        </div>
        <img src={src.cover} alt="Note-taking app" />
      </section>
      <section className="features" id="features">
        <h2>Features</h2>
        <div className="feature">
          <img className="feature-gif" src={src.Search} alt="Feature 1" />
          <div className="feature-text">
            <p>Organize your notes with tags and categories.</p>
          </div>
        </div>
        <div className="feature">
          <img className="feature-gif" src={src.slashMenu} alt="Feature 2" />
          <div className="feature-text">
            <p>Take notes easily with our powerful editor.</p>
          </div>
        </div>
        <div className="feature">
          <img className="feature-gif" src={src.delete} alt="Feature 3" />
          <div className="feature-text">
            <p>Easily manage your thoughts</p>
          </div>
        </div>
      </section>
      <section className="tech-skills" id="tech-skills">
        <h2>Tech Skills</h2>
        <div className="skills-grid">
          <div className="skill">
            <h4>
              <SiAmazons3 size={30} /> S3
            </h4>
            <p>store and manage user-uploaded images in the editor.</p>
          </div>
          <div className="skill">
            <h4>
              <SiMongodb size={30} /> MongoDB
            </h4>
            <p>Enhance search performance with MongoDB Atlas.</p>
          </div>
          <div className="skill">
            <h4>
              <SiAmazonsqs size={30} /> SQS
            </h4>
            <p>improving application's responsiveness and scalability</p>
          </div>
          <div className="skill">
            <h4>
              <SiAwslambda size={30} /> Lambda
            </h4>
            <p>Allowing to generate note summary of notes asynchronously</p>
          </div>
          <div className="skill">
            <h4>
              <SiAmazonecs size={30} /> ECS
            </h4>
            <p>Managing the service easily for resource control</p>
          </div>
          <div className="skill">
            <h4>
              <FaDocker size={30} /> Docker
            </h4>
            <p>Improving automatic service for deployment processes.</p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Note App. All rights reserved.</p>
        <div>
          <a
            href="https://github.com/fockspaces/fastnote"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/chang-feng-ming-650ba9167/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin size={24} />
          </a>
        </div>
      </footer>

      <ConfirmModal
        showModal={showModal}
        setShowModal={setShowModal}
        handleConfirmDelete={confirmLogin}
        message={message}
      />
    </div>
  );
};

export default IntroductionPage;
