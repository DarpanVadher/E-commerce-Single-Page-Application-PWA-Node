import { Request, Response, NextFunction } from "express";
import { OK } from "http-status/lib";
import ProductServices from "./services";
// import { getAppInfoQuery } from "@/types/request/home";
// import { product } from "@/types/response/product";
import { apiResponse } from "@/helpers/apiResponse";

const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //Get Search Query
    const search = req.headers.search as string;

    const products = await ProductServices.getProducts(search);

    res.status(OK).json(apiResponse(products));
  } catch (error) {
    next(error);
  }
};

export default { getProducts };
