import User from "../model/user.js";

export const Register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const findUser = await User.findOne({ email });
    if (findUser) {
      return res.status(400).send({ error: "you have an account already..." });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    user.password = undefined;
    // await user.save()
    res.status(200).send({
      message: "user successfully create 👌",
      user,
    });
  } catch (e) {
    if(e.name === 'ValidationError') {
      return res.status(400).send({
        message: 'validation error',
        error: e
      })
    }
    return res.status(500).send({
      message: 'an error accorded...',
      error: e
    })
  }
};
