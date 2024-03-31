import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getProducts = async (search?: string): Promise<any> => {
  try {
    // console.log(prisma.product, "Prisma");
    // console.log(search, "Search");

    const products = await prisma.product.findMany({
      where: {
        name: {
          contains: search,
        },
      },
    });

    return products;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const productDAO = { getProducts };
