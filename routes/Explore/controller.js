import { getGridFSAllFiles } from "../../database/gridfs-service.js";
import { findAllAlbums } from "../Album/service.js";
import { findAllArtists } from "../Artist/service.js";

export const getExploreData = async (req, res, next) => {
  try {
    const albums = await findAllAlbums();
    const tracks = await getGridFSAllFiles();
    const artists = await findAllArtists();

    let resultAlbums;
    let result;

    if (albums) resultAlbums = albums.slice(0, 5);
    if (tracks) result = tracks.slice(0, 6);

    return res.status(200).json({
      success: true,
      message: "Explore data",
      albums: resultAlbums,
      tracks: result,
      artists,
    });
  } catch (err) {
    next(err);
  }
};
