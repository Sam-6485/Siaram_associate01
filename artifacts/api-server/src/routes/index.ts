import { Router, type IRouter } from "express";
import healthRouter from "./health";
import leadsRouter from "./leads";

const router: IRouter = Router();

router.use(healthRouter);
router.use("/leads", leadsRouter);

export default router;
