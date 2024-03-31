import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
const prisma = new PrismaClient();

const getSessionOrCreate = async (sessionId?: string): Promise<any> => {
  try {
    // console.log(prisma.product, "Prisma");
    // console.log(search, "Search");

    console.log(sessionId, "Session Id");

    if (!sessionId) {
      sessionId = uuidv4();
    }
    console.log(sessionId, "Session Id 2");

    const existingSession = await prisma.sessions.findUnique({
      where: {
        sessionId: sessionId,
      },
    });

    console.log(existingSession, "existingSession");

    // If the user exists, return it
    if (existingSession) {
      return existingSession;
    } else {
      // If the user doesn't exist, create a new user
      const newSession = await prisma.sessions.create({
        data: {
          sessionId: uuidv4(),
          // You can add other user properties here
        },
      });

      // console.log(newSession, "newSession");

      return newSession;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const sessionDAO = { getSessionOrCreate };
