import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Apierrors from '../../Backend/src/utils/Apierrors.js'
import { login, logout } from './store/authslice.js'
import Home from './Pages/Home.jsx'
function App() {
  const [Loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  useEffect(() => {
    const fetchuser = async () => {
      try {
        const user = await fetch("http://localhost:5173/current-user", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          }
        })
        if (!user.ok) {
          dispatch(logout())
          throw new Apierrors(400, "Failed to fetch user")
        }
        const data = await user.json()
        console.log(data)
        dispatch(login({ data }))
        setLoading(false)
      } catch (error) {
        setLoading(false)
        throw new Apierrors(400, "Error while Fetching the user: ", error)
      }

    }
    fetchuser()
  }, [])
  return (
    Loading ? (
    <>
     <h2>Loading...</h2>
    </>) : (
    <>
    <Home/>
    </>)
  )
}

export default App
