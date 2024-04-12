import React from 'react'
import ReactDOM from 'react-dom/client'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { Home, Search, Login, Player, Signup, LoginphoneNO, SignupPhone, ForgotPasswordPage, Album } from './Pages/Index.js'
import { Provider } from 'react-redux'
import store from './store/store.js'
import Test from './Test/Test.jsx'
import Temp from './components/Temp.jsx'
import CreatePlaylist from './components/CreatePlaylist.jsx';
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='/' element={<Home />} />
      <Route path='signup' element={<Signup />} />
      <Route path='signup/phoneno' element={<SignupPhone />} />
      <Route path='login' element={<Login />} />
      <Route path='login/phoneno' element={<LoginphoneNO />} />
      <Route path='search' element={<Search />} />
      <Route path='song/:songname' element={<Player />} />
      <Route path='forgot-password' element={<ForgotPasswordPage />} />
      <Route path='test' element={<Test />} />
      <Route path='temp' element={<Temp />} />
      <Route path='createplaylist' element={<CreatePlaylist />} />
      <Route path='album' element={<Album />} />
    </Route>
  )
)
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>,
  </Provider>
)
