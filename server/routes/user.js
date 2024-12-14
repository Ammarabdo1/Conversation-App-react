import express from "express";
import { Register, Login } from "../controllers/user.js";
import isAuth from "../middlewares/isAuth.js";
const userRouter = express.Router();

userRouter.post("/register", Register);

userRouter.post("/login", Login);

userRouter.get("/secret", isAuth, (req, res) => {
  res.send({ message: "Welcome in secret route...👌", userId: req.userId });
});

export default userRouter;
