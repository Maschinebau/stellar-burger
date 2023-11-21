import { Routes, Route, useNavigate, useLocation } from "react-router-dom"
import { Account } from "../account/Account"
import { Constructor, Profile, Layout, Login, Register, ForgotPassword, ResetPassword } from "../../pages"
import { RequireAuth } from "../hoc/RequireAuth"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { refreshTokenRequest, resetUser, checkAuth } from "../../store/slices/userSlice"
import { getCookie } from "../../utils/api"
import { IngredientDetails } from "../popups/IngredientDetails"
import { Modal } from "../modal/modal"

function App() {
  const dispatch = useDispatch()
  const ingredient = useSelector((state) => state.burgerConstructor.currentIngredient)
  const location = useLocation()
  const navigate = useNavigate()
  const background = location.state && location.state.background

  const handleModalClose = () => {
    navigate(-1)
  }

  useEffect(() => {
    dispatch(checkAuth())
  }, [dispatch])

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Constructor />} />
          <Route
            path="profile/*"
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
          <Route path="/ingredients/:id" element={<IngredientDetails />}></Route>
        </Route>
      </Routes>
      {background && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={
              <Modal onClose={handleModalClose}>
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  )
}

export default App
