import React from 'react'
import { configureStore } from '@reduxjs/toolkit'
import authslice from './authslice.js'
const store = configureStore({
    reducer: {
        auth: authslice
    }
})

export default store