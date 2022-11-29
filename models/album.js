import mongoose from "mongoose";

const albumSchema = mongoose.Schema(
  {
    artistId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Artist",
      required: true,
    },
    title: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    cover: {
      type: mongoose.Schema.Types.String,
    },
    year: {
      type: mongoose.Schema.Types.Number,
      required: true,
      min: 1900,
    },
  },
  {
    timestamps: true,
  }
);

export const Album = mongoose.model("Album", albumSchema);
