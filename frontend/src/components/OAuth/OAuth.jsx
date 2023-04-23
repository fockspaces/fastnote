import GoogleOAuth from "./GoogleOAuth";
import { useState, useEffect } from "react";
import { login } from "../../api/login";
import jwt_decode from "jwt-decode";

function OAuth() {
  const [user, setUser] = useState(null);

  const handleLogin = async (access_token) => {
    await login(access_token);
  };

  useEffect(() => {
    const access_token = localStorage.getItem("access_token");
    if (access_token) {
      // decode token and store in user state
      const { userId, email, name, picture } = jwt_decode(access_token);
      setUser({ userId, email, name, picture });
    }
  }, []);

  return <> {!user && <GoogleOAuth handleLogin={handleLogin} />}</>;
}

export default OAuth;
