import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
export const verifyJwt = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  const privateKey = process.env.JWT_TOKEN_SECRETE;
  if (token && privateKey) {
    try {
      const userid = jwt.verify(token, privateKey);
      console.log(token);
      if (userid) {
        console.log(userid);
        req.body.id = userid.toString();
        console.log(req.body.id);
        next();
      }
    } catch (e) {
      console.log(e);
    }
  } else {
    res.status(403);
    res.json({
      error: "no token",
    });
  }
};
