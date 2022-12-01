import ErrorResponse from "../../utils/errorResponse.js";
import {
  createArtist,
  findArtistById,
  findAllArtists,
  deleteArtist,
} from "./service.js";
import { isValidObjectId } from "mongoose";

export const getAllArtists = async (req, res, next) => {
  try {
    const artists = await findAllArtists();
    if (!artists || artists.length === 0)
      throw new ErrorResponse("No artists found", 404);
    return res.status(200).json({
      success: true,
      message: "List artists",
      artists,
    });
  } catch (err) {
    next(err);
  }
};

export const getArtistById = async (req, res, next) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      throw new ErrorResponse("ID not valid", 422);
    }
    const artist = await findArtistById(req.params.id);
    if (!artist) throw new ErrorResponse("No artist with id found", 404);
    return res.status(200).json({
      success: true,
      message: "Artist by id",
      artist,
    });
  } catch (err) {
    next(err);
  }
};

export const addNewArtist = async (req, res, next) => {
  try {
    const artist = await createArtist(
      req.body.firstName,
      req.body.lastName,
      req.body.bio
    );

    return res.status(200).json({
      success: true,
      message: "Artist created successfully",
      artist,
    });
  } catch (err) {
    next(err);
  }
};

export const removeArtisteById = async (req, res, next) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      throw new ErrorResponse("ID not valid", 422);
    }
    const artistById = await findArtistById(req.params.id);
    if (!artistById) throw new ErrorResponse("No artiste with id found", 404);

    const artist = await deleteArtist(req.params.id);
    return res.status(200).json({
      success: true,
      message: "Artist deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};
