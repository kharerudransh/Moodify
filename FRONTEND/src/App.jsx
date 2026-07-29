import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import FaceExpression from "./features/expression/component/FaceExpression";
import {RouterProvider} from "react-router"
import { appRoutes } from './app.routes'
import "./features/shared/styles/global.scss"
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './features/auth/auth.context';
import { SongContextProvider } from './features/home/Song.context';   // ✅ import bhi capital se

function App() {
  return (
    <div className="app-background">
      <AuthProvider>
        <SongContextProvider>   {/* ✅ ab ye REAL component ban jayega, HTML tag nahi */}
          <ToastContainer position="top-right" theme="dark" />
          <RouterProvider router={appRoutes} />
        </SongContextProvider>
      </AuthProvider> 
    </div>
  )
}

export default App
