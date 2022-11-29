import multer from "multer";

export const uploadAlbumCover = multer({
  storage: multer.diskStorage({}),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "image/jpeg") {
      cb(null, true);
    } else {
      cb(file.mimetype);
      cb("Fichier image non valide", false);
    }
  },
});
