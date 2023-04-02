import Editor from "./components/Editor";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleOAuth from "./components/GoogleOAuth";
import { useState, useEffect } from "react";
import { login } from "./utils/login";
import jwt_decode from "jwt-decode";

function App() {
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
