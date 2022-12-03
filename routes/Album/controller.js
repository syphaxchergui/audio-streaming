import ErrorResponse from "../../utils/errorResponse.js";
import {
  createAlbum,
  deleteAlbum,
  findAlbumById,
  findAllAlbums,
  findAllAlbumsByArtist,
  findAlbumBySlug,
} from "./service.js";
import cloudinary from "../../core/cloudinary.js";
import { isValidObjectId } from "mongoose";
import { findArtistById } from "../Artist/service.js";
import slug from "slug";

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

export const getAlbumsByArtist = async (req, res, next) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      throw new ErrorResponse("ID not valid", 422);
    }
    const artist = await findArtistById(req.params.id);
    if (!artist) throw new ErrorResponse("No artist with id found", 404);

    const albums = await findAllAlbumsByArtist(req.params.id);
    if (!albums || albums.length === 0)
      throw new ErrorResponse("No albums found", 404);

    return res.status(200).json({
      success: true,
      message: artist.firstName + "'s albums",
      artist,
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

export const getAlbumBySlug = async (req, res, next) => {
  try {
    if (!req.params.slug) {
      throw new ErrorResponse("slug not valid", 422);
    }
    const album = await findAlbumBySlug(req.params.slug);
    if (!album) throw new ErrorResponse("No album with slug found", 404);

    return res.status(200).json({
      success: true,
      message: "Album by slug",
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

    const artist = await findArtistById(req.body.artistId);

    if (!artist) throw new ErrorResponse("Artist not found", 404);

    let result = await cloudinary.uploader.upload(req.file.path);
    const album = await createAlbum(
      req.body.artistId,
      req.body.title,
      req.body.year,
      result.url,
      slug(req.body.title)
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
