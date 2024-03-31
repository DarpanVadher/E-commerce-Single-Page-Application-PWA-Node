import { Request, Response, NextFunction } from "express";
import { OK } from "http-status/lib";
import * as jose from "jose";
// import ProductServices from "./services";
import SessionServices from "./services";
// import { getAppInfoQuery } from "@/types/request/home";
// import { product } from "@/types/response/product";
import { apiResponse } from "@/helpers/apiResponse";
import { decrypt, encrypt } from "@/helpers/encryption";

// const getProducts = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     //Get Search Query
//     const search = req.headers.search as string;

//     const products = await ProductServices.getProducts(search);

//     res.status(OK).json(apiResponse(products));
//   } catch (error) {
//     next(error);
//   }
// };

const checkSession = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    let sessionId = req.headers.sessionid as string;

    sessionId = decrypt(sessionId);

    const getSessionOrCreate = await SessionServices.getSessionOrCreate(
      sessionId,
    );

    console.log(getSessionOrCreate.sessionId, "getSessionOrCreate");

    const secret = new TextEncoder().encode(process.env.JWT_SECRET || "secret");
    const alg = "HS256";

    const jwt = await new jose.SignJWT(getSessionOrCreate)
      .setProtectedHeader({ alg })
      .setIssuedAt()
      .setIssuer("urn:example:issuer")
      .setAudience("urn:example:audience")
      .setExpirationTime("2h")
      .sign(secret);

    // console.log(jwt);

    const encryptedSessionId = encrypt(getSessionOrCreate.sessionId);

    res
      .status(OK)
      .json(apiResponse({ sessionId: encryptedSessionId, token: jwt }));
  } catch (error) {
    console.log(error);

    next(error);
  }
};

export default { checkSession };
