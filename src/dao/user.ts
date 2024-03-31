import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createUser = async ({
  name,
  email,
}: {
  name: string;
  email: string;
}): Promise<{ id: number; name: string | null; email: string }> => {
  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
      },
    });
    console.log(user);

    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const Users = { createUser };
