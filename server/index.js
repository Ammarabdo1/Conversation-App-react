import express from "express";
import cors from "cors";
import { connectDB } from "./config.js";
import userRouter from "./routes/user.js";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const PORT = 8000;

app.use(express.json());
app.use(express.static("public"));
app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => res.send("Welcome every one❤️"));

app.use("/user", userRouter);

connectDB();

io.on("connection", (socket) => {
  console.log("Connected user:", socket.id);

  socket.on("disconnect", () => {
    console.log("disconnected user: ", socket.id);
  });
});

server.listen(PORT, () =>
  console.log(`Successfully listen in port : ${PORT}👍`)
);