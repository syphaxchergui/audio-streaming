import ErrorResponse from "../../utils/errorResponse.js";
import {
  createAlbum,
  deleteAlbum,
  findAlbumById,
  findAllAlbums,
} from "./service.js";
import cloudinary from "../../core/cloudinary.js";
import { isValidObjectId } from "mongoose";

export const getAllAlbums = async (req, res, next) => {
  try {
    const albums = await findAllAlbums();
    if (!albums || albums.length === 0)
      throw new ErrorResponse("No albums found", 404);
    return res.status(200).json({
      success: true,
      message: "List albums",
      albums,
    });
  } catch (err) {
    next(err);
  }
};

export const getAlbumById = async (req, res, next) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      throw new ErrorResponse("ID not valid", 422);
    }
    const album = await findAlbumById(req.params.id);
    if (!album) throw new ErrorResponse("No album with id found", 404);
    return res.status(200).json({
      success: true,
      message: "Album by id",
      album,
    });
  } catch (err) {
    next(err);
  }
};

export const addNewAlbum = async (req, res, next) => {
  try {
    if (!isValidObjectId(req.body.artistId)) {
      throw new ErrorResponse("ArtistId not valid", 422);
    }
    let result = await cloudinary.uploader.upload(req.file.path);
    const album = await createAlbum(
      req.body.artistId,
      req.body.title,
      req.body.year,
      result.url
    );

    return res.status(200).json({
      success: true,
      message: "Album created successfully",
      album,
    });
  } catch (err) {
    next(err);
  }
};

export const removeAlbumById = async (req, res, next) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      throw new ErrorResponse("ID not valid", 422);
    }
    const albumById = await findAlbumById(req.params.id);
    if (!albumById) throw new ErrorResponse("No album with id found", 404);

    const album = await deleteAlbum(req.params.id);
    return res.status(200).json({
      success: true,
      message: "Album deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};
