import styles from "./app.module.css"
import { AppHeader } from "../app-header/app-header"
import { Routes, Route } from "react-router-dom"
import { Constructor } from "../../pages/Constructor"
import { Profile } from "../../pages/Profile"
import { Layout } from "../../pages/Layout"
import { Login } from "../../pages/Login"
import { Register } from '../../pages/Register'
import { ForgotPassword } from '../../pages/Forgot-password'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Constructor />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>
    </Routes>
  )
}

export default App
