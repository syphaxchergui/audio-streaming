import { getGridFSAllFiles } from "../../database/gridfs-service.js";
import { findAllAlbums } from "../Album/service.js";

export const getExploreData = async (req, res, next) => {
  try {
    const albums = await findAllAlbums();
    const tracks = await getGridFSAllFiles();
    let result;
    if (tracks) result = tracks.slice(0, 6);

    return res.status(200).json({
      success: true,
      message: "Explore data",
      albums,
      tracks: result,
    });
  } catch (err) {
    next(err);
  }
};
