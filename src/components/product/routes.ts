import { Router } from "express";
import productController from "./controller";
import { appKeyValidator } from "./validators";
import { sanitizer } from "@/helpers";

const productRouter = Router();

productRouter.get(
  "/",
  sanitizer(appKeyValidator),
  productController.getProducts,
);

export default productRouter;
