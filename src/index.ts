import next from "next";
import mongoose from "mongoose";
import { Server } from "http";
import io from "socket.io";
import path from "path";
import fs from "fs";

import { generateUserName } from "./server/generateUserName";
import { createSocketHandler } from "./server/createSocketHandler";
import { createRequestHandler } from "./server/createRequestHandler";
import { initializeDB } from "./database/helpers/initializeDB";

const port = parseInt(process.env.PORT) || 3001;
const env = process.env.NODE_ENV || "develop";
const dev = env !== "production";
const pkg = JSON.parse(
  fs.readFileSync(path.join(__dirname, "package.json")).toString()
);

const nextApp = next({
  dir: ".",
  dev,
});
const handler = nextApp.getRequestHandler();

nextApp
  .prepare()
  .then(async () => {
    await initializeDB();
    console.log("Web server started to listen port");
    // create http server
    const httpServer = new Server((req, res) => {
      requestHandler(req, res) || handler(req, res);
    });

    // create Socket.io server
    const socketServer = new io.Server(httpServer);
    const socketHandler = createSocketHandler(socketServer);
    const requestHandler = createRequestHandler(socketServer);
    socketServer.engine["generateId"] = generateUserName;
    socketServer.on("connection", socketHandler);

    // start listening
    httpServer.listen(port, () => {
      console.error("Web server started to listen port:", port);
    });
  })
  .catch((err) => {
    console.error("Next.js server failed to start", err);
  });
