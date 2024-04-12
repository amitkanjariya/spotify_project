import React from 'react'
import { Left, Container, Button } from '../components/Index.js'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
function Search() {
  const [keyword, setkeyword] = useState("")
  const [playlists, setplaylists] = useState([])
  const [filteredTrack, setFilteredTrack] = useState([]);
  useEffect(() => {
    const fetchsong = async () => {
      try {
        const tracks = await fetch('http://localhost:5000/65fee632861108c88f20bf4c/song/fetchsongs', {
          method: 'GET'
        })
        const trackk = await tracks.json()
        setplaylists(trackk.data)
        // console.log(trackk.data[0][0].album.images[1].url)
        // console.log(playlists)
      }
      catch (error) {
        console.error("Error: ", error)
      }
    }
    fetchsong()
  }, [])
  useEffect(() => {
    // Filter tracks based on keyword
    if (keyword === "") {
      setFilteredTrack(playlists);
    } else {
      const filtered = playlists.filter(t =>
        t.album.name.toLowerCase().includes(keyword.toLowerCase()) ||
        t.artists[0].name.toLowerCase().includes(keyword.toLowerCase())
      );
      setFilteredTrack(filtered);
    }

  }, [keyword, playlists]);
  const changetext = () => {
    const login = document.getElementById("Login")
    login.style.fontSize = "large"
  }
  const ct = () => {
    const login = document.getElementById("Login")
    login.style.fontSize = "16px"
  }
  const playchange = (index) => {
    const play = document.getElementById(`play${index}`)
    play.style.display = "block"
  }
  const playchanges = (index) => {
    const play = document.getElementById(`play${index}`)
    play.style.display = "none"
  }
  const authStatus = useSelector((state) => state.auth.status)

  return (
    <Container className='h-screen p-3 gap-2 flex'>
      <Left />
      <div className='flex flex-col w-full'>
        <div className='bg-neutral-900 rounded-md p-3 items-center flex justify-between'>
          <div className='flex gap-2 h-12'>
            <img src='.././img/search1.svg' width={30} className='hover:cursor-pointer'></img>
            <input type='search' placeholder='What do you want to play?' className='rounded-full border-white w-96 text-center' value={keyword} onChange={(e) => setkeyword(e.target.value)} />
          </div>
          <div>

            {

              authStatus ? (

                <button className="w-32  bg-white rounded-full p-4 font-semibold font-Poppins text-black hover:bg-slate-200 duration-150">
                  Logout
                </button>
              )
                :
                (

                  <div className='bg-neutral-900 flex items-center p-4 w-full rounded-t-md'>
                    <Link to='/signup'>

                      <Button className=' w-32 bg-neutral-900 text-neutral-600 font-Poppins text-pretty font-semibold hover:text-white duration-200'>Sign up</Button>
                    </Link>
                    <Link to='/login'>

                      <button className='w-32  bg-white rounded-full p-4 font-semibold font-Poppins text-black hover:bg-slate-200 duration-150' onMouseOver={changetext} id="Login" onMouseOut={ct}>Log in</button>
                    </Link>
                  </div>

                )
            }
          </div>
        </div>
        <div className=' bg-neutral-800 flex flex-col gap-4 h-full overflow-auto rounded-b-lg justify-between'>
          <p className='font-Poppins text-white font-bold text-2xl mx-5 my-2'>Spotify Songs</p>
          <div className='flex gap-12 flex-wrap  overflow-auto h-64'>
            {
              filteredTrack.map((playlist, index) => (
                <Link to={`/song/${playlist.id}`} className='bg-zinc-500 rounded-md h-auto p-4 flex flex-col gap-3 items-center hover:cursor-pointer duration-150' key={index} style={{ flexBasis: '30%', maxWidth: '30%', position: 'relative' }} id='link' onMouseOver={() => playchange(index + 1)} onMouseOut={() => playchanges(index + 1)}>
                  <img src={playlist.album.images[1].url} className='rounded-md'></img>
                  <img src='.././img/play.svg' className='absolute top-80 hidden' id={`play${index + 1}`}></img>
                  <p className='text-white font-Poppins'>{playlist.album.name}</p>
                  <p className='text-white font-Poppins'>Artist name: {playlist.artists[0].name}</p>
                </Link>
              ))
            }
          </div>
          <div className=' bg-green-600 h-25 p-5 flex gap-10 justify-between'>
            <div className='flex flex-col gap-5'>
              <p className='font-bold font-Poppins text-white'>Instagram Link</p>
              <div className='flex items-center cursor-pointer gap-1'>
                <a href='https://www.instagram.com/amit_kanjariya._/' className=' bg-neutral-800 rounded-full p-2' target='_blank'>
                  <img src='.././img/instagram.svg'></img>
                </a>

              </div>
            </div>
            <div className='flex flex-col gap-5'>
              <p className='font-bold font-Poppins text-white'> Facebook Link</p>
              <div className='flex items-center cursor-pointer gap-1'>
                <a href='https://www.facebook.com/profile.php?id=10009194916420' className=' bg-neutral-800 rounded-full p-2' target='_blank'>
                  <img src='.././img/facebook.svg'></img>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default Search