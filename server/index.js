import express from "express";
import cors from "cors";
import { connectDB } from "./config.js";
import userRouter from "./routes/user.js";
import http from "http";
import { Server } from "socket.io";
import { isSocketAuth } from "./middlewares/isAuth.js";
import messageRouter from "./routes/message.js";
import isAuth from "./middlewares/isAuth.js";
import Message from "./model/message.js";

const app = express();
const server = http.createServer(app);
export const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.use(isSocketAuth);

const PORT = 8000;

app.use(express.static("public"));
app.use(express.json());
app.use(cors({}));

app.get("/", (req, res) => res.send("Welcome every one❤️"));

app.use("/user", userRouter);

app.use("/message", isAuth, messageRouter);

connectDB();

io.on("connection", (socket) => {
  console.log("Connected user:", socket.userId);

  socket.join(socket.userId);
  socket.on("disconnect", () => {
    console.log("disconnected user: ", socket.id);
  });

  socket.on("send_message", async ({ friendId, content }) => {
    const userId = socket.userId;
    const message = await Message.create({
      senderId: userId,
      receiverId: friendId,
      content,
    });
    io.to([userId, friendId]).emit("receive_message", message);
  });

  socket.on("typing", (receiverId) => {
    socket.to(receiverId).emit("isTyping", socket.userId);
  });

  socket.on("stop_typing", (receiverId) => {
    socket.to(receiverId).emit("notTyping", socket.userId);
  });

  socket.on("seen", async (receiverId) => {
    await Message.updateMany(
      { senderId: receiverId, receiverId: socket.userId, seen: false },
      { $set: { seen: true } }
    );

    const updateMessages = await Message.find({
      senderId: receiverId,
      receiverId: socket.userId,
      seen: false,
    });

    io.emit("isSeen", updateMessages);
  });
});

server.listen(PORT, () => {
  console.log(`Successfully listen in port : ${PORT}👍`);
});
