import { Router } from "express";
import homeRouter from "@/components/sample/routes";
import productRouter from "@/components/product/routes";
import sessionRouter from "@/components/session/routes";
import cartRouter from "@/components/carts/routes";

import { authCheck } from "@/middlewares/authCheck";
const router = Router();

router.use("/", homeRouter);
router.use("/session", sessionRouter);
router.use("/product", authCheck, productRouter);
router.use("/cart", authCheck, cartRouter);

export default router;
