// setup.js
import http from "http";
import app from "../app.js";

export default async () => {
  console.log("setup starting");

  const server = http.createServer(app);
  global.__SERVER__ = server.listen(process.env.TEST_PORT || 8001);
  console.log(global.__SERVER__ )
  console.log("setup finished");
};
