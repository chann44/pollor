import { Router } from "express";
import { loginUser, regiseterUser } from "../controllers/auth";

const router = Router();

router.post("/signup", regiseterUser);
router.post("/login", loginUser);

export default router;
