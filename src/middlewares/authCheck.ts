import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { decrypt } from "@/helpers/encryption";

export const authCheck = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // console.log(req.session, "req.session");
    const accessToken = req?.headers?.authorization as string;
    let sessionId = req?.headers?.sessionid as string;

    if (!accessToken || !sessionId) {
      res.status(401).json({
        error: {
          code: 401,
          message: "Unauthorized",
          path: req.originalUrl,
        },
      });
    }

    sessionId = decrypt(sessionId);

    const token = accessToken?.split(" ")[1];

    if (!token) {
      res.status(401).json({
        error: {
          code: 401,
          message: "Unauthorized",
          path: req.originalUrl,
        },
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret") as {
      sessionId: string;
    };

    // console.log(decoded.sessionId, "decoded");

    // console.log(sessionId, "sessionId");

    if (sessionId !== decoded.sessionId) {
      res.status(401).json({
        error: {
          code: 401,
          message: "Unauthorized",
          path: req.originalUrl,
        },
      });
    }

    next();
  } catch (error) {
    console.log(error);

    next(error);
  }
};
