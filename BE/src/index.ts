import express from "express";
import cors from "cors";
import Routes from "./Routes/route";
import * as dotenv from "dotenv";
import { google } from "googleapis";
import passport from "passport";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use("/api/v1", Routes);

app.listen(port, () => {
  console.log(`Server is Running on ${port}`);
});
