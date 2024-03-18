import React from 'react'
import ReactDOM from 'react-dom/client'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { Home, Search,Login } from './Pages/Index.js'
import { Provider } from 'react-redux'
import store from './store/store.js'
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
    <Route path='' element={<Home/>}/>
      <Route path='search' element={<Search />} />
      <Route path='login' element={<Login/>}/>
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
