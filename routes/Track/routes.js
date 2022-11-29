import express from "express";
import { errorHandler } from "../../middlewares/error.js";
import {
  getAllTracks,
  getTrackById,
  getTracMetaDataById,
  removeTrack,
  uploadTrack,
} from "./controller.js";
import { GridFSMiddleware } from "../../middlewares/gridfs-middleware.js";

const router = express.Router();

router.get("/", getAllTracks, errorHandler);

router.get("/:id", getTrackById, errorHandler);

router.get("/metadata/:id", getTracMetaDataById, errorHandler);

router.post("/", [GridFSMiddleware()], uploadTrack, errorHandler);

router.delete("/:id", removeTrack, errorHandler);

export default router;
