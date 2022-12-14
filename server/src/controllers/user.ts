import { Request, Response } from "express";
import { prisma } from "../uttils/prisma";

export const getLoggedinUser = async (req: Request, res: Response) => {
  const id = req.body.id;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        profile: true,
        Follows: {
          include: {
            follower: true,
            catagory: true,
          },
        },
      },
    });
    res.status(200);
    res.json(user);
  } catch (e) {
    console.log(e);
    res.status(500);
    res.json(e);
  }
};

export const getUser = async (req: Request, res: Response) => {
  const userId = req.params.id;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(userId),
      },
      include: {
        profile: true,
        Poll: {
          include: {
            Option: true,
            creator: true,
            Comment: true,
          },
        },
      },
    });
    if (user) {
      res.status(200);
      res.json(user);
    } else {
      res.status(404);
      res.json("user not found");
    }
  } catch (e) {
    console.log(e);
    res.status(500);
    res.json(e);
  }
};

export const getFeed = async (req: Request, res: Response) => {
  const userid = req.body.id;
  console.log(userid);
  try {
    const polls = await prisma.poll.findMany({
      where: {
        OR: [
          {
            catagories: {
              some: {
                Follows: {
                  some: {
                    userId: Number(userid),
                  },
                },
              },
            },
          },
          {
            creatorId: Number(userid),
          },
        ],
      },
      include: {
        Option: true,
        Comment: true,
        creator: true,
      },
    });
    res.status(200);
    res.json(polls);
  } catch (e) {
    console.log(e);
    res.status(500);
    res.json(e);
  }
};

export const followCatagory = async (req: Request, res: Response) => {
  const catagoryid = req.body.catagoryId;
  const userid = req.body.userId;

  try {
    const followedCat = await prisma.follows.create({
      data: {
        userId: userid,
        catagoryId: catagoryid,
      },
    });
    res.status(200);
    res.json(followedCat);
  } catch (e) {
    res.status(500);
    res.json(e);
  }
};

export const deletePoll = async (req: Request, res: Response) => {
  const pollId = req.body.pollId;

  try {
    const poll = await prisma.poll.delete({
      where: {
        id: pollId,
      },
    });
    res.json(200);
    res.json(poll);
  } catch (e) {
    res.status(500);
    res.json(e);
  }
};

export const createprofile = async (req: Request, res: Response) => {
  console.log(req.body);
  const userId = req.body.id;
  const email = req.body.email;
  const bio = req.body.bio;
  const age = req.body.age;
  const gender = req.body.gender;
  const topics = req.body.Topics;
  try {
    const profile = await prisma.profile.update({
      where: {
        userId: Number(userId),
      },
      data: {
        bio: bio,
        age: Number(age),
        email: email,
        gender: gender,
      },
    });
    console.log(profile);
    const followData: any = topics.map((catID: number) => {
      return {
        catagoryId: catID,
        userId: Number(userId),
      };
    });
    console.log(profile);
    const follow = await prisma.follows.createMany({
      data: followData,
    });
    console.log(follow);

    res.status(200);
    res.json("success");
  } catch (e) {
    console.log(e);
    res.status(500);
    res.json(e);
  }
};
