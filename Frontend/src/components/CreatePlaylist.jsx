import React, { useState, useRef } from "react";
import {useNavigate} from 'react-router-dom';
const CreatePlaylist = () => {
  const [chosenImageSrc, setChosenImageSrc] = useState(
    "../img/file-upload-icon.svg"
  );
  const [Pname,setPname] = useState("")
  const [fileName, setFileName] = useState("");
  const [isCloseIconVisible, setIsCloseIconVisible] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate()
  const handleImageClick = () => {
    inputRef.current.click();
  };
 const pnav = ()=>{
    if (Pname) {
      
       navigate(`/playlist/:${Pname}`)
    }
 }
  const handleUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setChosenImageSrc(reader.result);
    };

    reader.readAsDataURL(file);
    setFileName(file.name);
  };

  const handleCloseClick = () => {
    // Implement functionality to close the container here
    navigate("/")
    console.log("Container closed");
  };

  return (
    <div
      className="container bg-gray-800 absolute w-2/3 min-w-450px transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 p-10 pt-5 shadow-lg rounded-lg"
      onMouseEnter={() => setIsCloseIconVisible(true)}
      onMouseLeave={() => setIsCloseIconVisible(false)}
    >
      {isCloseIconVisible && (
        <button
          className="absolute top-2 right-2 p-3 text-gray-400 hover:text-gray-600 focus:outline-none"
          onClick={handleCloseClick}
        >
          <img src="../img/close.svg" alt="" className="w-7 h-7 bg-gray-500 rounded-full filter invert p-1" />
        </button>
      )}
      <div className="text-5xl font-bold p-3 text-gray-700 dark:text-slate-200">
        Create Playlist
      </div>
      <form action="">
        <div className="flex flex-row  p-4 pt-8">
          <div className="" onClick={handleImageClick}>
            <figure className="image-container  mb-8">
              <img
                id="chosen-image"
                src={chosenImageSrc}
                alt="Chosen Image"
                className="block relative w-60 h-64 rounded-2xl"
              />
            </figure>
            <input
              type="file"
              id="upload-button"
              accept="image/*"
              ref={inputRef}
              onChange={handleUpload}
              className="hidden"
            />
            <label
              htmlFor="upload-button"
              className="block relative bg-black text-white text-xl text-center w-60 py-4 rounded-lg cursor-pointer"
            >
              <i className="fas fa-upload"></i> &nbsp; Choose A Photo
            </label>
          </div>
          <div className="flex flex-col ml-16 w-full  min-w-200px">
            <div className="mb-4">
              <label
                className="block text-slate-200 text-xl font-medium mb-2"
                htmlFor="playlistname"
              >
                Name
              </label>
              <input
                className="shadow text-xl appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-slate-100"
                id="playlistname"
                type="text"
                placeholder="Enter playlist Name"
                onChange={(e)=>setPname(e.target.value)}
              />
            </div>
            <div className="mt-3">
              <label
                htmlFor="message"
                className="block mb-2 text-xl font-medium text-slate-200"
              >
                Your message
              </label>
              <textarea
                id="message"
                rows="6"
                className="block p-3 w-full text-lg text-gray-900 bg-gray-800 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-700 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Give your playlist a catchy description..."
              ></textarea>
            </div>
          </div>
        </div>
        <div className="pt-5 flex float-right">
          <button
            href="#"
            className="px-5 py-2 text-xl font-medium text-center text-white bg-green-500 rounded-lg hover:bg-green-400 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-green-500 dark:hover:bg-green-400 dark:focus:ring-green-500"
            onClick = {pnav}
          >
            create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePlaylist;