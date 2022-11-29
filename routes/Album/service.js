import { Album } from "../../models/album.js";
import ErrorResponse from "../../utils/errorResponse.js";

export const findAllAlbums = async () => {
  try {
    const albums = Album.find({}, "-__v -createdAt -updatedAt").populate(
      "artistId",
      "-__v -createdAt -updatedAt"
    );
    return albums;
  } catch (err) {
    throw new ErrorResponse("Erreur du serveur", 500);
  }
};

export const findAlbumById = async (id) => {
  try {
    const album = Album.findById(id, "-__v -createdAt -updatedAt").populate(
      "artistId",
      "-__v -createdAt -updatedAt"
    );
    return album;
  } catch (err) {
    throw new ErrorResponse("Erreur du serveur", 500);
  }
};

export const createAlbum = async (artistId, title, year, cover) => {
  try {
    const album = Album.create({
      artistId,
      title,
      cover,
      year,
    });
    return album;
  } catch (err) {
    throw new ErrorResponse("Erreur lors de la creation de l'album", 500);
  }
};

export const deleteAlbum = async (id) => {
  try {
    const album = Album.deleteOne({ _id: id });
    return album;
  } catch (err) {
    throw new ErrorResponse("Erreur lors de la supression de l'album", 500);
  }
};