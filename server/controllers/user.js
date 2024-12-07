import User from "../model/user.js";
import {
  avatar,
  createToken,
  firstErrorMessage,
  hashPass,
} from "../utils/index.js";
import { checkPass } from "../utils/user.js";

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
  } catch (e) {
    //! check if the error validation fields
    if (e.name == "ValidationError") {
      return res.status(400).send({
        message: "Validation failed",
        error: firstErrorMessage(e),
      });
    }

    //! this error isn't occurred from user
    res.status(500).json({
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
    return res.status(404).send({ error: "user not found!" });
  }

  //! password isn't valid case
  const isValidPassword = await checkPass(password, user.password);
  if (!isValidPassword) {
    return res.status(401).send({error: "Password isn't correct!"})
  }

  //! valid request
  user.password = undefined;
  const token = createToken(user.id);
  res.status(200).send({ message: "successfully login", user, token });
};
