import express from "express";
import cors from "cors";
import { connectDB } from "./config.js";
import userRouter from "./routes/user.js";
const app = express();
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
app.listen(PORT, () => console.log(`Successfully listen in port : ${PORT}👍`));
