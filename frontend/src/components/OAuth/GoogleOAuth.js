import {  useGoogleOneTapLogin } from "@react-oauth/google";

function GoogleOAuth({ handleLogin }) {
  useGoogleOneTapLogin({
    onSuccess: (credentialResponse) => {
      handleLogin(credentialResponse.credential);
    },
    onError: () => {
      console.log("Login Failed");
    },
  });
  return <div></div>;
}

export default GoogleOAuth;
