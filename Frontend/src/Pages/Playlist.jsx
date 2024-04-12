import React from "react";
import { useState, useEffect, useRef } from "react";
import ControlPanel from "../components/controls/ControlPanel.jsx";
import Slider from "../components/slider/Slider.jsx";
import { useNavigate } from "react-router-dom";
import styles from "./Hero.module.css";

import { useParams } from "react-router-dom";

function Player() {
  let sindex = 0;
  const { songname } = useParams();
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(50);
  const [vimg, setVimg] = useState(".././img/volume.svg");
  const [percentage, setPercentage] = useState(0);
  const navigate = useNavigate();
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
        // console.log(trackk.data[0].album)
        setSongs(trackk.data);
        songs.map((song, i) => {
          // console.log(song.id)
          if (song.id === songname) {
            sindex = i;
            setCurrentSong(song);
            console.log(sindex);
          }
        });

        // setCurrentSong(trackk.data[0][index]);
        console.log(currentSong);
        // console.log(currentSong.album);
      } catch (error) {
        console.error("Error: ", error);
      }
    };
    // console.log(currentSong.id);
    fetchSongs();
    // setPercentage(0)
  }, []);
  const [index, setIndex] = useState(sindex);
  useEffect(() => {
    if (currentSong && audioRef.current.currentTime === 0) {
      audioRef.current.volume = volume / 100; // Set volume when currentSong changes
    }
  }, [currentSong, volume]);
  // console.log(songs.length)
  const handleVolume = (e) => {
    const { value } = e.target;
    const volume = Number(value) / 100;
    audioRef.current.volume = volume;
    console.log(volume);
    setVolume(volume * 100);
    if(volume===0){
      setVimg(".././img/mute.svg");
    }
    else{
      setVimg(".././img/volume.svg");
    }
  };

  const onChange = (e) => {
    const audio = audioRef.current;
    // console.log(e.target.value)
    // console.log(audio.duration)
    audio.currentTime = (audio.duration / 100) * e.target.value;
    // console.log(e.target.value);
    if (e.target.value === "0") {
      setIsPlaying(false);
      audio.pause();
    } else {
      setIsPlaying(true);
      audio.play();
    }
    setPercentage(e.target.value);
  };
  const play = () => {
    const audio = audioRef.current;
    audio.volume = 0.1;
    setIsPlaying((prev) => !prev);
    if (!isPlaying) {
      audio.play();
    }
    if (isPlaying) {
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
    setIndex((prevIndex) => {
      if (prevIndex === 0) {
        return songs.length - 1;
      } else {
        return prevIndex - 1;
      }
    });
    setIsPlaying(false);
    // console.log(index)
  };
  const skiptoNext = () => {
    setIsPlaying(false);
    setIndex((prevIndex) => {
      if (prevIndex === songs.length - 1) {
        return 0;
      } else {
        return prevIndex + 1;
      }
    });
    // console.log(index)
  };
  useEffect(() => {
    setCurrentSong(songs[index]);
    navigate(`/song/${currentSong?.id}`);
    setPercentage(0);
  }, [index, songs]);
  const getRating = () => {
    let rating = currentSong.popularity ? currentSong.popularity : 0;
    rating = rating / 10;
    return rating;
  };
  const getArtist = () => {
    let artistList = "";
    for (let i = 0; i < currentSong.artists.length - 1; i++) {
      artistList += `${currentSong.artists[i].name}, `;
    }
    artistList += ` ${
      currentSong.artists[currentSong.artists.length - 1].name
    }`;

    return artistList;
  };
  
  return (
    <div className="bg-black">
      <div>
        <div className="bg-black h-5/6">
          <section className={styles.container}>
            <div className={styles.content}>
              <h1 className={styles.title}>
                {currentSong ? currentSong.name : "Song Name"}
              </h1>
              <p className={styles.description}>
                Album Name: {currentSong ? currentSong.album.name : " "}
              </p>
              <p className={styles.description}>
                Artist Name: {currentSong ? getArtist() : " "}
              </p>
              <p className={styles.description}>
                Rating: {currentSong ? `${getRating()}/10` : "0/10"}
              </p>
              <p className={styles.description}>
                Release date:{" "}
                {currentSong ? currentSong.album.release_date : "Artist Name"}
              </p>
            </div>
            <div className={styles.imageContainer}>
              <img
                src={
                  currentSong
                    ? currentSong.album.images[0].url
                    : ".././img/music.svg"
                }
                alt="Song image"
                className={`${styles.heroImg}`}
              />
              <div className={styles.overlay}>
                
                <div className={styles.overlayText}>
                <h2 className="text-green-500 text-3xl  pb-8">
                    Spotify
                    <p>
                     Music for Everyone
                    </p>
                </h2>
                Explore the vibrant world of Spotify, where melodies dance and rhythms sing. Let each track be a doorway to adventure, a gateway to inspiration, in the symphony of your life
                </div>
              </div>
            </div>
            <div className={styles.topBlur} />
          </section>
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
              <span className="text-md text-gray-500 dark:text-gray-200 font-Poppins">
                {currentSong ? currentSong.name : "Song Name"}
              </span>
              <p className="text-md text-gray-500 dark:text-gray-400 font-Poppins">
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
                  onEnded={(e) => {
                    e.preventDefault();
                    setIsPlaying(false);
                  }}
                  src={currentSong?.preview_url}
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
                <Slider
                  percentage={percentage}
                  onChange={onChange}
                  onClick={play}
                />
                <ControlPanel duration={duration} currentTime={currentTime} />
              </div>
            </div>
          </div>
          <div className="items-center justify-center hidden ms-auto md:flex">
            <button
              data-tooltip-target="tooltip-volume"
              type="button"
              className="p-2.5 group rounded-full focus:outline-none "
            >
              <img src={vimg} alt="" />
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
    </div>
  );
}
export default Player;
