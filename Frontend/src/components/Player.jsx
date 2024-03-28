import React from "react";
import { useState, useEffect, useRef } from "react";
import ControlPanel from "./controls/ControlPanel";
import Slider from "./slider/Slider";
import { useNavigate } from "react-router-dom";
import {
  BsFillSkipStartCircleFill,
  BsFillSkipEndCircleFill,
} from "react-icons/bs";
import { useParams } from "react-router-dom";

function Player() {
  const {songname} = useParams()
  const [songs, setSongs] = useState([]);
  const [index, setIndex] = useState(0);
  const [currentSong, setCurrentSong] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(50);
  const [percentage, setPercentage] = useState(0);
  const playlistId = "65fee632861108c88f20bf4c";
  const navigate = useNavigate()
  const audioRef = useRef();

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const tracks = await fetch(
          "http://localhost:5000/65fee632861108c88f20bf4c/song/fetchsongs",
          {
            method: "GET",
          }
        );
        const trackk = await tracks.json();
        // console.log(trackk.data[0])
        setSongs(trackk.data[0]);
          songs.map((song, i) => {
            console.log(song);
            if(song.album.name === songname){
              setCurrentSong(song);
              setIndex(i);
            }
          })

        // setCurrentSong(trackk.data[0][index]);
        // console.log(currentSong);
        // console.log(currentSong.album);
      } catch (error) {
        console.error("Error: ", error);
      }
    };
    fetchSongs();
  }, [songname, currentSong]);

  const handleVolume = (e) => {
    const { value } = e.target;
    const volume = Number(value) / 100;
    audioRef.current.volume = volume;
    // console.log(volume*100);
    setVolume(volume * 100);
  };

  const onChange = (e) => {
    const audio = audioRef.current;
    audio.currentTime = (audio.duration / 100) * e.target.value;
    setPercentage(e.target.value);
  };

  const play = () => {
    const audio = audioRef.current;
    audio.volume = 0.1;
    if (!isPlaying) {
      setIsPlaying(true);
      audio.play();
    }
    if (isPlaying) {
      setIsPlaying(false);
      audio.pause();
    }
  };

  const getCurrDuration = (e) => {
    const percent = (
      (e.currentTarget.currentTime / e.currentTarget.duration) *
      100
    ).toFixed(2);
    const time = e.currentTarget.currentTime;
    setPercentage(+percent);
    setCurrentTime(time.toFixed(2));
  };

  const skipBack = () => {
    if (index == 0) {
      setIndex(songs.length - 1);
      setCurrentSong(songs[index]);
    } else {
      setIndex(index - 1);
      setCurrentSong(songs[index]);
    }
    navigate(`/song/${currentSong.name}`)
    audioRef.current.currentTime = 0;
  };
  // console.log(currentSong.name);
  const skiptoNext = () => {
    if (index == songs.length - 1) {
      setIndex(0);
      setCurrentSong(songs[index]);
    } else {
      setIndex(index + 1);
      setCurrentSong(songs[index]);
    }
    navigate(`/song/${currentSong.name}`)
    audioRef.current.currentTime = 0;
  };

  return (
    <>
      <div>
        <div className=" w-full max-w-xl h-400  bg-gray-700 border border-gray-900 rounded-lg shadow">
          <div className="flex pt-4 justify-center items-center">
            <img
              className="h-300 me-0 w-300 rounded"
              src={
                currentSong
                  ? currentSong.album.images[1].url
                  : "https://tailwindcss.com/img/card-top.jpg"
              }
              alt="Video preview"
            />
            <div className="flex flex-col p-3 pt-1 pr-5 me-auto">
              <span className="text-md text-gray-500 dark:text-gray-200">
                {currentSong ? currentSong.name : "Song Name"}
              </span>
              <p className="text-md text-gray-500 dark:text-gray-400">
                {currentSong
                  ? currentSong.album.artists[0].name
                  : "Artist Name"}
              </p>
            </div>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 z-50 grid w-full h-24 grid-cols-1 px-5 bg-white border-t border-gray-200 md:grid-cols-3 dark:bg-black dark:border-gray-600">
          <div className="pt-4 justify-center me-auto hidden  md:flex">
            <img
              className="h-16 me-0 w-16 rounded"
              src={
                currentSong
                  ? currentSong.album.images[2].url
                  : "https://tailwindcss.com/img/card-top.jpg"
              }
              alt="Video preview"
            />
            <div className="flex flex-col p-3 pt-1 pr-5 me-auto">
              <span className="text-md text-gray-500 dark:text-gray-200">
                {currentSong ? currentSong.name : "Song Name"}
              </span>
              <p className="text-md text-gray-500 dark:text-gray-400">
                {currentSong
                  ? currentSong.album.artists[0].name
                  : "Artist Name"}
              </p>
            </div>
          </div>

          <div className="flex items-center w-full">
            <div className="w-full">
              <div className="flex items-center justify-center mx-auto">
                <audio
                  ref={audioRef}
                  onTimeUpdate={getCurrDuration}
                  onLoadedData={(e) => {
                    setDuration(e.currentTarget.duration.toFixed(2));
                  }}
                  src={currentSong.preview_url}
                />

                <div className="flex pt-1.5 w-full justify-center">
                  {/* previous song */}
                  <div className="pr-2">
                    <button
                      data-tooltip-target="tooltip-previous"
                      type="button"
                      onClick={skipBack}
                      className="p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      <svg
                        className="rtl:rotate-180 w-5 h-5 text-gray-500 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 12 16"
                      >
                        <path d="M10.819.4a1.974 1.974 0 0 0-2.147.33l-6.5 5.773A2.014 2.014 0 0 0 2 6.7V1a1 1 0 0 0-2 0v14a1 1 0 1 0 2 0V9.3c.055.068.114.133.177.194l6.5 5.773a1.982 1.982 0 0 0 2.147.33A1.977 1.977 0 0 0 12 13.773V2.227A1.977 1.977 0 0 0 10.819.4Z" />
                      </svg>
                    </button>
                  </div>

                  <div className="p-2">
                    <div className="btn-container">
                      <div
                        onClick={play}
                        className={isPlaying ? "btn-stop" : "btn-play"}
                      ></div>
                    </div>
                  </div>

                  {/* next song */}
                  <div className="pl-2">
                    <button
                      data-tooltip-target="tooltip-next"
                      type="button"
                      onClick={skiptoNext}
                      className="p-3 rounded-full hover:bg-gray-100 me-1  dark:hover:bg-gray-600"
                    >
                      <svg
                        className="rtl:rotate-180 w-5 h-5 text-gray-500 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 12 16"
                      >
                        <path d="M11 0a1 1 0 0 0-1 1v5.7a2.028 2.028 0 0 0-.177-.194L3.33.732A2 2 0 0 0 0 2.227v11.546A1.977 1.977 0 0 0 1.181 15.6a1.982 1.982 0 0 0 2.147-.33l6.5-5.773A1.88 1.88 0 0 0 10 9.3V15a1 1 0 1 0 2 0V1a1 1 0 0 0-1-1Z" />
                      </svg>
                      <span className="sr-only">Next video</span>
                    </button>
                  </div>
                </div>
              </div>
              <div>
                {/* play song and seekbar  */}
                <Slider percentage={percentage} onChange={onChange} />
                <ControlPanel
                  play={play}
                  isPlaying={isPlaying}
                  duration={duration}
                  currentTime={currentTime}
                />
              </div>
            </div>
          </div>
          <div className="items-center justify-center hidden ms-auto md:flex">
            <button
              data-tooltip-target="tooltip-volume"
              type="button"
              className="p-2.5 group rounded-full hover:bg-gray-100 focus:outline-none dark:hover:bg-gray-600"
            >
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 18"
              >
                <path d="M10.836.357a1.978 1.978 0 0 0-2.138.3L3.63 5H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h1.63l5.07 4.344a1.985 1.985 0 0 0 2.142.299A1.98 1.98 0 0 0 12 15.826V2.174A1.98 1.98 0 0 0 10.836.357Zm2.728 4.695a1.001 1.001 0 0 0-.29 1.385 4.887 4.887 0 0 1 0 5.126 1 1 0 0 0 1.674 1.095A6.645 6.645 0 0 0 16 9a6.65 6.65 0 0 0-1.052-3.658 1 1 0 0 0-1.384-.29Zm4.441-2.904a1 1 0 0 0-1.664 1.11A10.429 10.429 0 0 1 18 9a10.465 10.465 0 0 1-1.614 5.675 1 1 0 1 0 1.674 1.095A12.325 12.325 0 0 0 20 9a12.457 12.457 0 0 0-1.995-6.852Z" />
              </svg>
              <span className="sr-only">Adjust volume</span>
            </button>
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => handleVolume(e)}
              className="2xl:w-40 lg:w-32 md:w-32 h-1 ml-2 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Player;
