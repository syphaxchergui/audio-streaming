import mongoose from "mongoose";

const artistSchema = mongoose.Schema(
  {
    firstName: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    lastName: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    alias: {
      type: mongoose.Schema.Types.String,
    },
    bio: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    pic: {
      type: mongoose.Schema.Types.String,
    },
  },
  {
    timestamps: true,
  }
);

export const Artist = mongoose.model("Artist", artistSchema);
