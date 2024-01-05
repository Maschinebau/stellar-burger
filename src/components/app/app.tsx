import { Routes, Route, useNavigate, useLocation } from "react-router-dom"
import {
  Constructor,
  Profile,
  Layout,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Feed
} from "../../pages"
import { ProtectedRoute } from "../hoc/ProtectedRoute"
import { useCallback, useEffect, useState } from "react"
import { checkAuth } from "../../store/slices/userSlice"
import { IngredientDetails } from "../popups/IngredientDetails"
import { Modal } from "../modal/Modal"
import { fetchIngredients } from "../../store/slices/ingredientsSlice"
import { BASE_URL } from "../../utils/constants"
import { OrderInfo } from "../orderInfo/OrderInfo"
import { OrdersHistory } from "../orders-history/ordersHistory"
import { Account } from "../Account/Account"
import { useAppDispatch } from "../hooks/useAppDispatch"

function App() {
  const dispatch = useAppDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const background = location.state && location.state.background
  const [authChecked, setAuthChecked] = useState(false)

  const handleModalClose = useCallback(() => {
    navigate(-1)
  }, [navigate])

  useEffect(() => {
    const initializeApp = async () => {
      await dispatch(checkAuth())
      setAuthChecked(true)
      await dispatch(fetchIngredients(`${BASE_URL}/ingredients`))
    }

    initializeApp()
  }, [dispatch])

  return (
    <>
      <Routes location={background || location}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Constructor />} />
          {/* проверим */}
          {authChecked && (
            <Route
              path="profile/*"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            >
              <Route index element={<Account />} />
              <Route path="orders" element={<OrdersHistory />} />
            </Route>
          )}
          {authChecked && (
            <Route
              path="profile/orders/:id"
              element={
                <ProtectedRoute>
                  <OrderInfo />
                </ProtectedRoute>
              }
            />
          )}
          <Route path="login/">
            <Route index element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="reset-password" element={<ResetPassword />} />
          </Route>
          <Route path="/ingredients/:id" element={<IngredientDetails />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="feed/:id" element={<OrderInfo />} />
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
          <Route
            path="/profile/orders/:id"
            element={
              <Modal onClose={handleModalClose}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path="/feed/:id"
            element={
              <Modal onClose={handleModalClose}>
                <OrderInfo />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  )
}

export default App
