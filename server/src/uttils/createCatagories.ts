import { prisma } from "./prisma";

export const createCatagory = async () => {
  const cats: string[] = [
    "Sports",
    "Gaming",
    "News",
    "Tv",
    "Meme",
    "Travel",
    "Tech",
    "Music",
    "Art",
    "Design",
    "Beauty",
    "Books",
    "Crypto",
    "Fashion",
    "Finance",
    "Food",
    "Health",
    "Learning",
    "Science",
    "Photography",
  ];

  cats.map(async (name: string) => {
    await prisma.catagory.create({
      data: {
        name: name,
      },
    });
  });
};
