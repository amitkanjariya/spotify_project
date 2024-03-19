import mongoose, { Schema } from "mongoose";

const playlistSchema = new Schema(
  {
    name: {
      type: String,
      minLength: [3, "Name must be more that 3 characters"],
      maxLength: [20, "Name must be at most 20 characters"],
      trim: true,
      default: "Your playlist",
      required: true,
    },
    description: {
      type: String,
      trim: true,
      maxLength: [300, "Description must be at most 300 characters"],
      required: true,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Please specify owner"],
    },
    songs: {
      type: [
        {
          type: mongoose.Schema.ObjectId,
          ref: "Song",
        },
      ],
      validate: {
        validator: (arr) => arr.length <= 30,
        message: "You can not add more than 30 songs to your playlist",
      },
    },
  },
  {
    timestamps: true,
  },
);

export const Playlist = mongoose.model("Playlist", playlistSchema);
