import express from "express";
import { errorHandler } from "../../middlewares/error.js";
import { getExploreData } from "./controller.js";

const router = express.Router();

router.get("/", getExploreData, errorHandler);

export default router;
