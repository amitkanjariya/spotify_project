import React from 'react'
import Button from './Button.jsx'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
function Right() {
  const authstatus = useSelector((state) => state.auth.status)
  const playlists = [
    {
      name: "LoveMashup",
      content: "For Love Buddies",
    },
    {
      name: "SadMelodies",
      content: "Sadness"
    },
    {
      name: "Travel",
      content: "Travel Time"
    },
    {
      name: "Study",
      content: "Study Time"
    },
    {
      name: "Lofi",
      content: "Lofi Time"
    }
  ]
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
  return (
    <div className='flex flex-col  w-full'>
      <div className='bg-neutral-900 flex justify-between items-center p-4 w-full rounded-t-md'>
        {

          authstatus ? (

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
      <div className=' bg-neutral-800 flex flex-col gap-4 h-full overflow-auto rounded-b-lg justify-between'>
        <p className='font-Poppins font-bold text-2xl mx-5 my-2'>Spotify Playlists</p>
        <div className='flex gap-12 flex-wrap  overflow-auto h-64'>
          {
            playlists.map((playlist, index) => (
              <Link to='/playlist'>
                <div className='flex flex-col gap-2 mx-4 p-4 rounded-md items-center bg-black hover:duration-150 w-40' onMouseOver={() => playchange(index + 1)} onMouseOut={() => playchanges(index + 1)}>
                  <img src={`.././img/${playlist.name}.jpg`} height={150} className='rounded-md' ></img>
                  <img src='.././img/play.svg' className='absolute top-80 hidden' id={`play${index + 1}`}></img>
                  <p className='font-Poppins font-bold text-white'>{playlist.name}</p>
                  <p className='font-Poppins text-sm font-semibold text-white'>{playlist.content}</p>
                </div>
              </Link>
            ))
          }

        </div>
        <div className=' bg-green-600 h-25 p-5 flex gap-10 justify-between'>
          <div className='flex flex-col gap-5'>
            <p className='font-bold font-Poppins'>Instagram Link</p>
            <div className='flex items-center cursor-pointer gap-1'>
              <a href='https://www.instagram.com/amit_kanjariya._/' className=' bg-neutral-800 rounded-full p-2' target='_blank'>
                <img src='.././img/instagram.svg'></img>
              </a>
              <a href='https://www.instagram.com/amit_kanjariya._/' className='font-Poppins' target='_blank'>Click here to Contact Us on Instagram</a>
            </div>
          </div>
          <div className='flex flex-col gap-5'>
            <p className='font-bold font-Poppins'> Facebook Link</p>
            <div className='flex items-center cursor-pointer gap-1'>
              <a href='https://www.instagram.com/amit_kanjariya._/' className=' bg-neutral-800 rounded-full p-2' target='_blank'>
                <img src='.././img/facebook.svg'></img>
              </a>
              <a href='' className='font-Poppins'>Click here to Contact Us on Facebook</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Right