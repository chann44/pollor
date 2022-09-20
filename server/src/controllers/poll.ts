import { Request, Response } from "express";
import { prisma } from "../uttils/prisma";

export const createPoll = async (req: Request, res: Response) => {
  const title = req.body.title;
  const options: string[] = req.body.options;
  const userId = req.body.userId;
  const catagoryId = req.body.catagoryId;
  console.log(title);
  try {
    const poll = await prisma.poll.create({
      data: {
        title: title,
        votes: 0,
        creatorId: userId,
        catagories: {
          connect: {
            id: catagoryId,
          },
        },
      },
    });

    const Options: any = options.map((text: string) => {
      return {
        text: text,
        pollId: poll.id,
        vote: 0,
      };
    });

    await prisma.option.createMany({
      data: Options,
    });

    const resPoll = await prisma.poll.findUnique({
      where: {
        id: poll.id,
      },
      include: {
        Option: true,
        catagories: true,
      },
    });
    res.status(200);
    res.json(resPoll);
  } catch (e) {
    console.log(e);
    res.status(500);
    res.json("internal server");
  }
};

export const getPoll = async (req: Request, res: Response) => {
  const pollId = req.params.id;
  try {
    const poll = await prisma.poll.findUnique({
      where: {
        id: Number(pollId),
      },
      include: {
        creator: true,
        Option: true,
        Comment: {
          include: { creator: true },
        },
      },
    });
    if (poll) {
      res.status(200);
      res.json(poll);
    } else {
      res.status(404);
      res.json("poll does'nt exist");
    }
  } catch (e) {
    console.log(e);
    res.status(500);
    res.json("internal server error");
  }
};

export const vote = async (req: Request, res: Response) => {
  const optionid = req.body.optionId;
  const pollid = req.body.pollId;
  const userId = req.body.userId;
  console.log(pollid);

  try {
    const vote = await prisma.vote.create({
      data: {
        pollId: Number(pollid),
        optionId: Number(optionid),
        voterId: userId,
      },
    });
    const option = await prisma.option.update({
      where: {
        id: optionid,
      },
      data: {
        vote: { increment: 1 },
      },
    });
    const poll = await prisma.poll.update({
      where: {
        id: pollid,
      },
      data: {
        votes: { increment: 1 },
      },
    });

    res.status(200);
    res.json([vote, option, poll]);
  } catch (e: any) {
    if (e.code == "P2002") {
      res.status(409);
      res.json(true);
      console.log("already voted on this poll");
    } else {
      console.log(e);
      res.json(500);
      res.json(e);
    }
  }
};

export const getPollbyCatagory = async (req: Request, res: Response) => {
  const cat = req.body.cat;
  try {
    const pollByCat = await prisma.poll.findMany({
      where: {
        catagories: {
          some: {
            name: cat,
          },
        },
      },
      include: {
        Option: true,
        Comment: true,
        creator: true,
      },
    });
    if (pollByCat) {
      res.status(200);
      res.json(pollByCat);
    } else {
      res.status(200);
      res.json({
        msg: "no poll found",
        data: null,
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500);
    res.json(e);
  }
};

export const searchPoll = async (req: Request, res: Response) => {
  const searchTerm = req.params.searchTerm;
  try {
    const serachedPoll = await prisma.poll.findMany({
      where: {
        title: {
          contains: searchTerm,
        },
      },
      include: {
        Option: true,
        Comment: true,
        creator: true,
      },
    });

    res.status(200);
    res.json(serachedPoll);
  } catch (e) {
    res.status(500);
    res.json(e);
  }
};
export const comment = async (req: Request, res: Response) => {
  const userId = req.body.userId;
  const text = req.body.text;
  const pollId = req.body.pollId;
  try {
    const comment = await prisma.comment.create({
      data: {
        text: text,
        creatorId: userId,
        pollId: pollId,
      },
      include: {
        creator: true,
      },
    });
    res.status(200);
    res.json(comment);
  } catch (e) {
    console.log(e);
    res.status(500);
    res.json("internal server");
  }
};

export const getAllCatagories = async (_req: Request, res: Response) => {
  try {
    const catagories = await prisma.catagory.findMany();
    res.status(200);
    res.json(catagories);
  } catch (e) {
    console.log(e);
    res.status(500);
    res.json(e);
  }
};
