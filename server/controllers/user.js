import User from "../model/user.js";
import {
  avatar,
  createToken,
  firstErrorMessage,
  hashPass,
} from "../utils/index.js";
import { checkPass } from "../utils/user.js";
import { io } from "../index.js";

//TODO>> register controller
export const Register = async (req, res) => {
  try {
    //! get data from user
    let { name, email, password } = req.body;

    //! check if email isn't used
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.send({ error: "You already have and account..." });
    }

    //! create new user in database
    const user = await User.create({
      name,
      email,
      password: await hashPass(password), // hashPass from utils user
      avatar, // avatar is URL from utils user
    });

    //! send data about user
    user.password = undefined;
    res.status(201).send({
      message: "Add new user successfully",
      user,
      token: createToken(user.id),
    });
    io.emit("user_created", user);

  } catch (e) {
    //! check if the error validation fields
    if (e.name == "ValidationError") {
      return res.send({
        message: "Validation failed",
        error: firstErrorMessage(e),
      });
    }

    //! this error isn't occurred from user
    res.json({
      message: "An error occurred during registration.",
      error: e.message,
    });
  }
};

export const Login = async (req, res) => {
  const { email, password } = req.body;

  //! user not found case
  const user = await User.findOne({ email });
  if (!user) {
    return res.send({ error: "user not found!" });
  }

  //! password isn't valid case
  const isValidPassword = await checkPass(password, user.password);
  if (!isValidPassword) {
    return res.send({ error: "Password isn't correct!" });
  }

  //! valid request
  user.password = undefined;
  const token = createToken(user.id);
  res.status(200).send({ message: "successfully login", user, token });
};

export const getFriends = async (req, res) => {
  try {
    console.log(req.userId);
    const users = await User.find({ _id: { $ne: req.userId } }).select(
      "-password"
    );
    res.status(200).json({ success: "true", users });
  } catch (e) {
    console.error("Error fetching friends:", error.message);
    res.json({
      success: false,
      message: "Unable to fetch friends. Please try again later.",
    });
  }
};
