import jwt from "jsonwebtoken";
import "dotenv/config";

export const createToken = (userId) => {
  if (!process.env.JWT_SECRETE_KEY || !process.env.JWT_EXPIRES_IN) {
    throw new Error("Missing JWT_SECRET_KEY or JWT_EXPIRES_IN");
  }

  return jwt.sign({ userId }, process.env.JWT_SECRETE_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export const getUserId = (token) => {
  return jwt.verify(token, process.env.JWT_SECRETE_KEY)
}
