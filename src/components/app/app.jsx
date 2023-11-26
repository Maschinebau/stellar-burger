import { Routes, Route, useNavigate, useLocation } from "react-router-dom"
import {} from "../account/Account"
import { Constructor, Profile, Layout, Login, Register, ForgotPassword, ResetPassword } from "../../pages"
import { RequireAuth } from "../hoc/RequireAuth"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { checkAuth } from "../../store/slices/userSlice"
import { IngredientDetails } from "../popups/IngredientDetails"
import { Modal } from "../modal/modal"
import { fetchIngredients } from "../../store/slices/ingredientsSlice"
import { BASE_URL } from "../../utils/constants"

function App() {
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const background = location.state && location.state.background

  const handleModalClose = () => {
    navigate(-1)
  }

  useEffect(() => {
    dispatch(checkAuth())
  }, [dispatch])

  useEffect(() => {
    dispatch(fetchIngredients(`${BASE_URL}/ingredients`))
  }, [dispatch])

  return (
    <>
      <Routes location={background || location}>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Constructor />} />
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
          <Route
            path="/ingredients/:id"
            element={<IngredientDetails />}
            state={{ background: false }}
          ></Route>
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
