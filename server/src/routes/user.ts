import {
  followCatagory,
  getFeed,
  getLoggedinUser,
  getUser,
} from "../controllers/user";
import { Router } from "express";

const router = Router();

router.get("/feed", getFeed);
router.get("/profile/:id", getUser);
router.post("/follow", followCatagory);
router.get("/", getLoggedinUser);

export default router;
