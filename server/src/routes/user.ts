import {
  createprofile,
  followCatagory,
  getFeed,
  getLoggedinUser,
  getUser,
} from "../controllers/user";
import { Router } from "express";

const router = Router();

router.post("/c", createprofile);
router.get("/feed", getFeed);
router.get("/profile/:id", getUser);
router.post("/follow", followCatagory);
router.post("/editprofile/:id");
router.get("/", getLoggedinUser);

export default router;
