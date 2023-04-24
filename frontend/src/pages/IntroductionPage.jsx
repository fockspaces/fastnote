import React, { useEffect, useState } from "react";
import Tiptap from "../components/EditPage/Editor/Tiptap";
import "../styles/introduction-page.scss";
import { useGoogleLogin } from "@react-oauth/google";
import { authGoogle } from "../api/authGoogle";

const IntroductionPage = () => {
  const initContent = localStorage.getItem("content") || "";
  const user = localStorage.getItem("user");
  const [content, setContent] = useState(initContent);

  useEffect(() => {
    localStorage.setItem("content", content);
  }, [content]);

  useEffect(() => {
    return () => {
      localStorage.setItem("content", content);
    };
  }, []);

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
        <a href="/">
          <img src={"/img/fastnoteLogo.png"} alt="Note App" className="logo" />
        </a>
        <nav>
          <a href="#features">Features</a>
          <a href="#try-it">Try It Now</a>
          {!user && (
            <button className="nav-button" onClick={() => googleLogin()}>
              Sign in
            </button>
          )}
        </nav>
      </header>

      <section className="hero">
        <div className="hero-content">
          <h2>Introducing Note App</h2>
          <p>The best note-taking app for all your needs.</p>
          <a href="#try-it" className="cta-btn">
            Try it now
          </a>
        </div>
        <img src="img/Taking notes-rafiki.png" alt="Note-taking app" />
      </section>

      <section className="features" id="features">
        <h2>Features</h2>
        <div className="feature">
          <img src="feature-1.png" alt="Feature 1" />
          <h3>Feature 1</h3>
          <p>Take notes easily with our powerful editor.</p>
        </div>
        <div className="feature">
          <img src="feature-2.png" alt="Feature 2" />
          <h3>Feature 2</h3>
          <p>Organize your notes with tags and categories.</p>
        </div>
        <div className="feature">
          <img src="feature-3.png" alt="Feature 3" />
          <h3>Feature 3</h3>
          <p>Access your notes from anywhere, anytime.</p>
        </div>
      </section>

      <section className="try-it" id="try-it">
        <h2>Try It Now</h2>
        <Tiptap note={{ content }} setContent={setContent} />
      </section>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Note App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default IntroductionPage;
