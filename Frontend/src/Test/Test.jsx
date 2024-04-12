import React, { useEffect, useState } from 'react';

function Test() {
    const [keyword, setkeyword] = useState("")
    const [songs, setsongs] = useState([])
    const fetchsongs = async () => {
        // const { keyword } = req.body
        const client_id = String(import.meta.env.CLIENT_ID)
        const client_secret = String(import.meta.env.CLIENT_SECRET)
        const AUTH_URL = "https://accounts.spotify.com/api/token"
        const SEARCH_URL = "https://api.spotify.com/v1/search"
        const track_query = "Shape of You"
        // const playlist = await Playlist.findById(req.params.playlistId)
        try {
            const authresponse = await fetch(AUTH_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `grant_type=client_credentials&client_id=${client_id}&client_secret=${client_secret}`
            })
            const authdata = await authresponse.json()
            const accesstoken = authdata.access_token
            // console.log(authdata.access_token)
            const searchtrack = await fetch(`${SEARCH_URL}?q=${encodeURIComponent(track_query)}&type=track&limit=10`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${accesstoken}`
                }
            })
            const response = await searchtrack.json()
            // console.log(data)
            const tracks = []
            tracks.push(response.tracks.items)
            console.log(tracks)
        }
        catch (error) {
            console.log(error)
        }
    }
    return (
        <form className='w-screen h-screen flex flex-col bg-black gap-2'>
            <input
                type='search'
                value={keyword}
                onChange={(e) => setkeyword(e.target.value)}
                placeholder='Search a song'
                className='max-w-md p-4 text-center text-black rounded-full'
            />
            <button className='text-black rounded-full p-3 bg-white max-w-md' onClick={(e) => {
                e.preventDefault()
                fetchsongs()
            }}>
                Get Data
            </button>
        </form>
    );
}

export default Test;
