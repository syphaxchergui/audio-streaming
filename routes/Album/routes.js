import express from "express";
import { uploadAlbumCover } from "../../core/multer.js";
import { errorHandler } from "../../middlewares/error.js";
import {
  addNewAlbum,
  getAlbumById,
  getAllAlbums,
  removeAlbumById,
  getAlbumsByArtist,
} from "./controller.js";

const router = express.Router();

router.get("/", getAllAlbums, errorHandler);

router.get("/:id", getAlbumById, errorHandler);

router.get("/artist/:id", getAlbumsByArtist, errorHandler);

router.post("/", uploadAlbumCover.single("cover"), addNewAlbum, errorHandler);

router.delete("/:id", removeAlbumById, errorHandler);

export default router;
