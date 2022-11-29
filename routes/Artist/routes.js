import express from "express";
import { errorHandler } from "../../middlewares/error.js";
import { addNewArtist, getAllArtists, getArtistById } from "./controller.js";

const router = express.Router();

router.get("/", getAllArtists, errorHandler);

router.get("/:id", getArtistById, errorHandler);

router.post("/", addNewArtist, errorHandler);

export default router;
