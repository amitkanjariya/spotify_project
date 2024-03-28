import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Index.js'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
function Left() {
    const [image, setImage] = useState(".././img/search.svg");
    const authStatus = useSelector(state => state.auth.status)
    const navigate = useNavigate()
    const crp = ()=>{
     if (authStatus) {
        navigate("/createplaylist")
     }
     else{
        navigate("/login")
     }
    }
    const ba = ()=>{
        if (authStatus) {
            navigate("/album")
         }
         else{
            navigate("/login")
         }
    }
    const enablescroll = () => {
        const id = document.getElementById("scroll")
        id.style.overflowY = "scroll"
    }
    const disablescroll = () => {
        const id = document.getElementById("scroll")
        id.style.overflowY = "hidden"

    }
    return (
        <div className='flex w-96 flex-col max-w-lg gap-3 h-full'>
            <div className='flex bg-neutral-900 p-5 flex-col h-36 rounded-md gap-5 max-w-sm' >
                <img src='.././img/spotify.svg' width={70} className='invert' alt="Spotify Logo" />
                <div className="flex flex-col gap-5">
                    <Link to='/' className='flex items-center gap-2'>
                        <img src='.././img/Home.svg' alt='Home' width={20} className='invert hover:cursor-pointer' />
                        <p className=" text-pretty text-gray-200 font-bold hover:cursor-pointer font-Poppins">Home</p>
                    </Link>
                    <Link to='/search' className='flex items-center gap-2'>
                        <img
                            src={image}
                            alt='Search'
                            width={20}
                            className='hover:duration-200 cursor-pointer'
                            onMouseOver={() => setImage(".././img/search1.svg")}
                            onMouseOut={() => setImage(".././img/search.svg")}
                        />
                        <p className="text-pretty text-gray-400 font-bold font-Poppins hover:text-white cursor-pointer duration-200">Search</p>
                    </Link>
                </div>
            </div>
            <div className='flex bg-neutral-900 flex-col h-full rounded-md p-3 gap-5'>
                <div className='flex justify-between items-center'>
                    <p className=' text-white font-Poppins font-semibold m-2'>Create a Playlist</p>
                    <Link to='/createplaylist' id='Playlistbtn'>
                        <img src='.././img/plus.svg' width={30} className='hover:bg-slate-100 rounded-full cursor-pointer p-2'></img>
                    </Link>
                </div>
                <div className={`flex flex-col gap-6 overflow-y-hidden max-h-52`} id='scroll' onMouseOver={enablescroll} onMouseOut={disablescroll}>
                    <div className='flex flex-col bg-neutral-800 p-5 text-white gap-3 rounded-md'>
                        <p className=' text-white font-Poppins font-semibold'>Create Your First Playlist</p>
                        <small className='font-Poppins text-balance font-semibold'>It's easy, we'll help you</small>
                                <button className=' w-40 rounded-full font-Poppins font-semibold p-2 text-sm bg-white text-black' type="button" onClick={crp}>
                                    Create Playlist
                                </button>
                            
                    </div>
                    <div className='flex flex-col bg-neutral-800 p-5 text-white gap-3 rounded-md'>
                        <p className=' text-white font-Poppins font-semibold'>Browse a Album</p>
                        <small className='font-Poppins text-balance font-semibold'>Browse Your Favourite Album</small>
                            <button className=' w-40 rounded-full font-Poppins font-semibold p-2 text-sm bg-white text-black' type="button" onClick={ba}>
                                Browse Album
                            </button>
                     
                    </div>
                </div>
                <div className='text-white font-semibold font-Poppins my-5'>
                    &copy; 2024 India, Inc. All rights reserved.
                </div>
                <div className=' flex gap-4 my-2 flex-wrap'>
                    <a href='https://www.spotify.com/in-en/legal/end-user-agreement/' className='font-bold text-neutral-700 hover:text-white duration-100'>Legal</a>
                    <a href='https://www.spotify.com/in-en/legal/privacy-policy/' className='font-bold text-neutral-700 hover:text-white duration-100'>Privacy Policy</a>
                    <a href='https://www.spotify.com/in-en/safetyandprivacy/reporting-content' className='font-bold text-neutral-700 hover:text-white duration-100'>Safety & Privacy Center</a>
                </div>
            </div>
        </div>
    );
}

export default Left;
