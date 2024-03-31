import { Router } from "express";
import cartController from "./controller";
import { appKeyValidator } from "./validators";
import { sanitizer } from "@/helpers";

const cartRouter = Router();

cartRouter.get("/", sanitizer(appKeyValidator), cartController.getCart);
cartRouter.post(
  "/add",
  sanitizer(appKeyValidator),
  cartController.addProductToCart,
);

cartRouter.put(
  "/update",
  sanitizer(appKeyValidator),
  cartController.updateProductToCart,
);

cartRouter.post(
  "/checkout",
  sanitizer(appKeyValidator),
  cartController.checkoutCart,
);

cartRouter.get(
  "/checkpaymentstatus",
  sanitizer(appKeyValidator),
  cartController.checkPaymentStatus,
);

export default cartRouter;
