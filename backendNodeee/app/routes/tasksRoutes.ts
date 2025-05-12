import { Router } from "express";
import { getTasks } from "../controllers/tasksCon";


const router = Router()

router.get("/", getTasks)

export default router;
