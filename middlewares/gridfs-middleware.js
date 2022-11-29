import multer from "multer";
import { storage } from "../database/gridfs-service.js";

const upload = multer({
  storage,
});

export function GridFSMiddleware() {
  return upload.single("track");
}
