import { Router } from "express";
import sessionController from "./controller";
import { appKeyValidator } from "./validators";
import { sanitizer } from "@/helpers";

const sessionRouter = Router();

sessionRouter.get(
  "/",
  sanitizer(appKeyValidator),
  sessionController.checkSession,
);

export default sessionRouter;
