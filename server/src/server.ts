import express from "express";
import auth from "./routes/auth";
import poll from "./routes/poll";
import user from "./routes/user";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import { verifyJwt } from "./middleware/verifyjwt";
const app = express();
app.use(
  cors({
    origin: "*",
  })
);

app.use(bodyParser.json());
app.use(cookieParser());

app.use("/auth", auth);
app.use("/poll", poll);
app.use("/", verifyJwt, user);
export default app;
