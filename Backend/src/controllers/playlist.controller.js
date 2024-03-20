import { Playlist } from "../models/playlist.model.js";
import { User } from "../models/user.model.js";
import asynchandler from "../utils/asynchandler.js";
import Apierrors from "../utils/Apierrors.js";
import Apiresponse from "../utils/Apiresponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const getAllPlaylists = asynchandler(async (req, res, next) => {
  const filter = {};
  if (req.user.id) filter.user = req.user.id.userId;

  const playlists = await Playlist.find({ user: req.user.id });

  res.status(200).json( new Apiresponse(200, playlists, "Successfully fetched all the playlists") );
});

const getPlaylist = asynchandler(async (req, res, next) => {
  const playlist = await Playlist.findById(req.params.id)
    .populate("songs")
    .populate("user", "name img");

  if (!playlist)
    return next(new Apierrors(404, "❓ No playlist found with that id"));

  res.status(200).json(new Apiresponse(200, playlist, "Successfully fetched playlist"));
});

const createPlaylist = asynchandler(async (req, res, next) => {
  const imageLocalPath = req.files?.imgKit[0].path;

  if (!imageLocalPath) {
    throw new Apierrors(400, "Image file is required");
  }

  const playlistImg = await uploadOnCloudinary(imageLocalPath);

  const playlist = await Playlist.create({
    user: req.user.id,
    img: playlistImg.url,
  });

  const user = await User.findByIdAndUpdate(
    req.user.id,
    {
      $addToSet: {
         playlists: playlist.id,
         img: playlistImg.url
      },
    },
    { runValidators: true, new: true },
  ).populate("playlists");

  res.status(200).json(new Apiresponse(200, playlist, "Successfully create playlist"));
});

const updatePlaylistImage = asynchandler(async (req, res, next) => {
  const imageLocalPath = req.file?.path;
  if (!imageLocalPath) {
    throw new Apierrors(400, "image file is missing");
  }

  const playlistImg = await uploadOnCloudinary(imageLocalPath);

  if (!playlistImg.url) {
    throw new Apierrors(400, "Error while uploading on Image");
  }

  const user = await User.findByIdAndUpdate(
    req.user?.id,
    {
      $set: {
        img: playlistImg.url,
      },
    },
    { new: true },
  );

  return res
    .status(200)
    .json(new Apiresponse(200, "Image updated successfully"));
});

const updatePlaylistName = asynchandler(async (req, res, next) => {
  if (req.body.name) data.name = req.body.name;
  if (req.body.description) data.description = req.body.description;
  const playlist = await Playlist.findByIdAndUpdate(req.params.id, data, {
    new: true,
    runValidators: true,
  });
  if (!playlist)
    return next(new Apierrors(404, "❓ No playlist found with that id"));
  res.status(200).json(new Apiresponse(400, playlist, "successfully update name or discription"));
})

const deletePlaylist = asynchandler(async (req, res, next) => {
  const playlist = await Playlist.findByIdAndDelete(req.params.id);
  if (!playlist)
    return next(new Apierrors(404, "❓ No playlist found with that id"));

  const user = await User.findByIdAndUpdate(
    req.user.id,
    { $pull: { playlists: req.params.id } },
    { runValidators: true, new: true },
  ).populate("playlists");

  res.status(200).json(new Apiresponse(200, user, "Successfully delete playlist"));
});

const addSong = asynchandler(async (req, res, next) => {
  const playlist = await Playlist.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { songs: req.params.song } },
    { runValidators: true, new: true },
  );

  res.status(200).json(new Apiresponse(200, `Song added to ${playlist.name}`));
});

const removeSong = asynchandler(async (req, res, next) => {
  const playlist = await Playlist.findByIdAndUpdate(
    req.params.id,
    { $pull: { songs: req.params.song } },
    { runValidators: true, new: true },
  );

  res.status(200).json(new Apiresponse(200, playlist, "Successfully remove song"));
});

export {
  getAllPlaylists,
  getPlaylist,
  createPlaylist,
  updatePlaylistImage,
  updatePlaylistName,
  deletePlaylist,
  addSong,
  removeSong,
};
