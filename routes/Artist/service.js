import { Artist } from "../../models/artist.js";
import ErrorResponse from "../../utils/errorResponse.js";

export const findAllArtists = async () => {
  try {
    const artists = Artist.find({}, "-__v -createdAt -updatedAt");
    return artists;
  } catch (err) {
    throw new ErrorResponse("Erreur du serveur", 500);
  }
};

export const findArtistById = async (id) => {
  try {
    const artist = Artist.findById(id, "-__v -createdAt -updatedAt");
    return artist;
  } catch (err) {
    throw new ErrorResponse("Erreur du serveur", 500);
  }
};

export const createArtist = async (firstName, lastName, bio) => {
  try {
    const artist = Artist.create({
      firstName,
      lastName,
      bio,
    });
    return artist;
  } catch (err) {
    throw new ErrorResponse("Erreur lors de la creation de l'artiste", 500);
  }
};
