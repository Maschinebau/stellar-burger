import { Routes, Route } from "react-router-dom"
import { Account } from "../account/Account"
import { Constructor, Profile, Layout, Login, Register, ForgotPassword, ResetPassword } from "../../pages"
import { RequireAuth } from "../hoc/RequireAuth"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { refreshTokenRequest, resetUser } from "../../store/slices/userSlice"
import { getCookie } from "../../utils/api"

function App() {
  const dispatch = useDispatch()

  // useEffect(() => {
  //   const refreshToken = getCookie("refreshToken")
  //   if (!refreshToken) return
  //   dispatch(refreshTokenRequest())
  // }, [dispatch])

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Constructor />} />
        <Route
          path="profile"
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />
        <Route path="login/">
          <Route index element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
