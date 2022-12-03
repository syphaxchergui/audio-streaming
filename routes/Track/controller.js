import { isValidObjectId } from "mongoose";
import {
  createGridFSReadStream,
  getGridFSAllFiles,
  getGridFSFiles,
  getGridFSFileMetaData,
  getGridFSAllFilesByAlbum,
} from "../../database/gridfs-service.js";
import ErrorResponse from "../../utils/errorResponse.js";
import { findAlbumById } from "../Album/service.js";

export const getAllTracks = async (req, res, next) => {
  try {
    const tracks = await getGridFSAllFiles();
    if (!tracks) {
      throw new ErrorResponse("Tracks list is empty", 404);
    }
    return res.status(200).json({
      success: true,
      message: "List of tracks",
      tracks,
    });
  } catch (err) {
    next(err);
  }
};

export const getTrackById = async (req, res, next) => {
  const trackId = req.params.id;
  try {
    const track = await getGridFSFiles(trackId);
    if (!track) throw new ErrorResponse("No track with ID", 404);

    res.setHeader("content-type", track.contentType);
    const readStream = createGridFSReadStream(trackId);
    readStream.pipe(res);
  } catch (err) {
    next(err);
  }
};

export const getTrackMetaDataById = async (req, res, next) => {
  const trackId = req.params.id;
  try {
    const track = await getGridFSFileMetaData(trackId);
    if (!track) throw new ErrorResponse("No track with ID", 404);

    const album = await findAlbumById(track.metadata.album);

    return res.status(200).json({
      success: true,
      message: "Track metadata",
      track,
      album,
    });
  } catch (err) {
    next(err);
  }
};
export const getTrackMetaDataByAlbum = async (req, res, next) => {
  try {
    const albumId = req.params.id;
    if (!isValidObjectId(albumId))
      throw new ErrorResponse("Invalid album Id", 422);

    const album = await findAlbumById(albumId);
    if (!album) throw new ErrorResponse("No album with ID", 404);

    const tracks = await getGridFSAllFilesByAlbum(albumId);
    if (!tracks) {
      throw new ErrorResponse("Tracks list is empty", 404);
    }
    return res.status(200).json({
      success: true,
      message: "List of tracks by album",
      album,
      tracks,
    });
  } catch (err) {
    next(err);
  }
};

export const uploadTrack = async (req, res, next) => {
  try {
    const { originalname, mimetype, id, size } = req.file;
    res.send({ originalname, mimetype, id, size });
  } catch (err) {
    next(err);
  }
};

export const removeTrack = async (req, res, next) => {
  try {
    const trackId = req.params.id;
    return res.send("deleted track id " + { trackId });
  } catch (err) {
    next(err);
  }
};
