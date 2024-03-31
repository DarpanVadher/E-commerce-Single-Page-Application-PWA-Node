import { Router } from "express";
import HomeController from "./controller";
import { appKeyValidator } from "./validators";
import { sanitizer } from "@/helpers";

const homeRouter = Router();

homeRouter.get("/", sanitizer(appKeyValidator), HomeController.getAppInfo);

export default homeRouter;
