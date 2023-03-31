import { google } from "googleapis";
const { OAuth2 } = google.auth;

const AuthUser = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization)
    return res.status(400).json({ error: "please provide access_token" });
  const token = authorization.split(" ")[1]; // Extract the token from the authorization header
  const clientId = process.env.GOOGLE_CLIENT_ID; // Replace with your actual client ID

  try {
    const userId = await TokenIsFromGoogle(token, clientId);
    req.userId = userId; // Add the user ID to the request object
    next(); // Call the next middleware or route handler
  } catch (error) {
    res.status(401).json({ error: "Invalid token" }); // Return a 401 Unauthorized response
  }
};

const TokenIsFromGoogle = async (token, clientId) => {
  const client = new OAuth2(clientId);
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: clientId,
  });
  const {
    iss: tokenIssuer,
    aud: tokenAudience,
    exp: tokenExpiration,
    sub: userId,
  } = ticket.getPayload();

  //   console.log(ticket.getPayload());

  // Check that the token was issued by Google
  if (
    tokenIssuer !== "https://accounts.google.com" &&
    tokenIssuer !== "accounts.google.com"
  ) {
    throw new Error("Invalid token issuer");
  }

  // Check that the token is meant for your application
  if (tokenAudience !== clientId) {
    throw new Error("Invalid token audience");
  }

  // Check that the token is not expired
  const now = Math.floor(Date.now() / 1000);
  if (now >= tokenExpiration) {
    throw new Error("Token has expired");
  }

  // Return the user ID from the token claims
  return userId;
};

export default AuthUser;
