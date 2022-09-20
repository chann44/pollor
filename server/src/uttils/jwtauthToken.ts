import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const createJwtToken = (userID: string) => {
  const privateKey = process.env.JWT_TOKEN_SECRETE;
  if (privateKey) {
    const token = jwt.sign(userID, privateKey);
    return token;
  } else {
    return null;
  }
};
