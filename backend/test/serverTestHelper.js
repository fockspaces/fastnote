// serverTestHelper.js
import http from "http";
import app from "../app.js";

let server = null;

const getTestServer = (port = 8001) => {
  if (!server) {
    server = http.createServer(app);
    server.listen(process.env.TEST_PORT || port);
  }

  return server;
};

export default getTestServer;
