import { Schema } from "mongoose";
import mongoose from "mongoose";

var gridSchema = new Schema({}, { strict: false });

export const TrackGrid = mongoose.model("Track", gridSchema, "tracks.files");
