import Editor from "./components/Editor";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleOAuth from "./components/GoogleOAuth";
import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (access_token) => {
    const decode = jwt_decode(access_token);
    const { email, name, picture } = decode;
    setUser({ name, email, picture });
    localStorage.setItem("access_token", access_token);
  };

  useEffect(() => {
    const access_token = localStorage.getItem("access_token");
    if (access_token) {
      handleLogin(access_token);
    }
  }, []);

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT}>
      {user ? (
        <div>
          <p>{user.name}</p>
          <p>{user.email}</p>
          <img src={user.picture} alt={user.name} />
        </div>
      ) : (
        <GoogleOAuth handleLogin={handleLogin} />
      )}
      <div className="App">
        <Editor />
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
