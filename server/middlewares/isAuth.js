import { getUserId } from "../utils/jwt.js";

const isAuth = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).send({ message: "Auth failed..." });
  }

  try {
    const data = getUserId(token);
    req.userId = data.userId;
    next();
  } catch {
    res.status(500).send({ message: "Auth failed..." });
  }
};

export const isSocketAuth = (socket, next) => {
  if (!socket.handshake?.query?.token) {
    return next(new Error("Authentication Invalid"));
  }
  try {
    const data = getUserId(socket.handshake.query.token);
    socket.userId = data.userId;
    next();
  } catch (e) {
    next(e)
  }
};

export default isAuth;
