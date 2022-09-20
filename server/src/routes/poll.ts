import {
  comment,
  createPoll,
  getAllCatagories,
  getPoll,
  getPollbyCatagory,
  searchPoll,
  vote,
} from "../controllers/poll";
import { Router } from "express";

const router = Router();

router.get("/dropit", getAllCatagories);
router.post("/create", createPoll);
router.post("/vote", vote);
router.post("/catagory", getPollbyCatagory);
router.get("/search/:searchTerm", searchPoll);
router.post("/comment", comment);
router.get("/:id", getPoll);

export default router;
