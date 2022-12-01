import express from "express";
import TrackRouter from "./Track/routes.js";
import AlbumRouter from "./Album/routes.js";
import ArtistRouter from "./Artist/routes.js";
import ExploreRouter from "./Explore/routes.js";

const router = express.Router();

router.use("/tracks", TrackRouter);
router.use("/albums", AlbumRouter);
router.use("/artists", ArtistRouter);
router.use("/explore", ExploreRouter);

export default router;
