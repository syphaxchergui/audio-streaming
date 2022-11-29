import mongoose from "mongoose";
import { GridFsStorage } from "multer-gridfs-storage";
import Grid from "gridfs-stream";
import { Schema } from "mongoose";
import { TrackGrid } from "../models/track.js";
import dotenv from "dotenv";
dotenv.config();

const url = process.env.URL;

Grid.mongo = mongoose.mongo;

const conn = mongoose.createConnection(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

conn.on("error", () => {
  console.log("[-] Error occurred from the database");
});

let gfs, gridFSBucket;

conn.once("open", () => {
  gridFSBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "tracks",
  });
  // Init stream
  gfs = Grid(conn.db);
  gfs.collection("tracks");
  console.log(
    "[!] The database connection opened successfully in GridFS service"
  );
});

export const getGridFSFiles = (id) => {
  return new Promise((resolve, reject) => {
    gfs.files.findOne({ _id: mongoose.Types.ObjectId(id) }, (err, files) => {
      if (err) reject(err);
      // Check if files
      if (!files || files.length === 0) {
        resolve(null);
      } else {
        resolve(files);
      }
    });
  });
};

export const getGridFSFileMetaData = async (id) => {
  //   var gridSchema = new Schema({}, { strict: false });

  //   var Grid = mongoose.model("_Track", gridSchema, "tracks.files");
  try {
    const track = await TrackGrid.findOne({ _id: mongoose.Types.ObjectId(id) });
    if (!track) return null;
    return track;
  } catch (err) {
    console.log(err);
    throw new Error("test");
  }
};

export const getGridFSAllFiles = async () => {
  //   var gridSchema = new Schema({}, { strict: false });

  //   var Grid = mongoose.model("Track", gridSchema, "tracks.files");
  try {
    const tracks = await TrackGrid.find();
    if (!tracks || tracks?.length < 1) return null;
    return tracks;
  } catch (err) {
    console.log(err);
    throw new Error("test");
  }
};

export const createGridFSReadStream = (id) => {
  return gridFSBucket.openDownloadStream(mongoose.Types.ObjectId(id));
};

export const storage = new GridFsStorage({
  url: url,
  cache: true,
  options: { useUnifiedTopology: true },
  file: (req, file) => {
    return new Promise((resolve) => {
      const fileInfo = {
        filename: file.originalname,
        bucketName: "tracks",
        metadata: {
          album: req.query.albumID,
        },
      };
      resolve(fileInfo);
    });
  },
});

storage.on("connection", () => {
  console.log("[!] Successfully accessed the GridFS database");
});

storage.on("connectionFailed", (err) => {
  console.log(err.message);
});

export default mongoose;
