import { Request, Response, NextFunction } from "express";
import { OK } from "http-status/lib";
import { HomeServices } from "./services";
import { getAppInfoQuery } from "@/types/request/home";
import { apiResponse } from "@/helpers/apiResponse";

const getAppInfo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const appInfoKey = req.query.key as getAppInfoQuery;
    const result = await HomeServices.getAppInfo(appInfoKey);

    res.status(OK).json(apiResponse(result));
  } catch (error) {
    next(error);
  }
};

const addUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const Params = req.params;
    console.log(Params);

    const result = await HomeServices.createUser({
      name: Params.name,
      email: Params.email,
    });
    res.status(OK).json(apiResponse(result));
  } catch (error) {
    next(error);
  }
};

export default { getAppInfo, addUser };
