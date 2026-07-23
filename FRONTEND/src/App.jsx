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
function App() {
  return (
    <div className="app-background">
      <AuthProvider>
        <ToastContainer position="top-right" theme="dark" />
        <RouterProvider router={appRoutes} />
      </AuthProvider>
    </div>
  )
}

export default App
