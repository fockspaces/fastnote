import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "../styles/LoginPage.scss";
import ConfirmModal from "../components/ListPage/utils/ConfirmModal";
import { login } from "../api/login";
import { useGoogleLogin } from "@react-oauth/google";
import { authGoogle } from "../api/authGoogle";
import { FcGoogle } from "react-icons/fc";
import { IoPeopleSharp } from "react-icons/io5";

const LoginPage = () => {
  const [showModal, setShowModal] = useState(false);

  const googleLogin = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (codeResponse) => {
      await authGoogle(codeResponse.code);
    },
    onError: (errorResponse) => console.log(errorResponse),
  });

  const message = {
    title: "Warning",
    body: "Your data will not be stored in guest mode. If you wish to retain your data, please consider logging in.",
    confirm: "Continue as Guest",
  };

  const confirmLogin = async () => {
    await login("", "guest");
  };

  return (
    <div className="login-page">
      <div className="Login-content">
        <h1 className="title">Fastnote</h1>
        <p className="subtitle">Keep it fast, simple and useful</p>
        <div className="buttons">
          <Button variant="dark" className="nav-button" onClick={googleLogin}>
            SIGN IN <FcGoogle className="mb-1" />
          </Button>
          <Button
            variant="dark"
            className="cta-btn"
            onClick={() => {
              setShowModal(true);
            }}
          >
            GUEST <IoPeopleSharp className="mb-1" />
          </Button>
        </div>
      </div>
      <ConfirmModal
        showModal={showModal}
        setShowModal={setShowModal}
        handleConfirmDelete={confirmLogin}
        message={message}
      />
    </div>
  );
};

export default LoginPage;
