import { Request, Response } from "express";
import { prisma } from "../uttils/prisma";
import { createJwtToken } from "../uttils/jwtauthToken";
import bcrypt from "bcrypt";
import { getRandomAvtar } from "g-avtar-sdk";
import { hashPassword } from "../uttils/hashpassword";
export const regiseterUser = async (req: Request, res: Response) => {
  const username = req.body.username;
  const password = req.body.password;
  const img = await getRandomAvtar();
  try {
    const hashedpassword = await hashPassword(password);
    if (hashedpassword) {
      const user = await prisma.user.create({
        data: {
          username: username,
          password: hashedpassword,
          profile: {
            create: {
              pfp: img.toString(),
            },
          },
        },
      });
      console.log(user);
      if (user) {
        const token = createJwtToken(user.id.toString());
        res.status(200);
        res.json({
          token: token,
          user: user,
        });
      } else {
        res.status(500);
        res.json("some error");
      }
    }
  } catch (e) {
    if (e.code == "P2002") {
      res.status(409);
      res.json("user already exist");
    } else {
      res.status(500);
      res.json("internal server erro");
    }
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log(username, password);
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });
    console.log(user);
    if (user) {
      const isPasswordMatched = await bcrypt.compare(password, user?.password);
      if (isPasswordMatched) {
        const token = createJwtToken(user.id.toString());
        res.status(200);
        res.json({
          token: token,
          user: user,
        });
      } else {
        res.status(403);
        res.json({
          msg: "incorrect password",
        });
      }
    } else {
      res.status(403);
      res.json({
        msg: "incorrect username",
      });
    }
  } catch (e) {
    console.log(e.code);
    res.status(500);
    res.json(e);
  }
};
