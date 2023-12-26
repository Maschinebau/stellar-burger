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
import { RequireAuth } from "../hoc/RequireAuth"
import { useCallback, useEffect } from "react"
import { useDispatch } from "react-redux"
import { checkAuth } from "../../store/slices/userSlice"
import { IngredientDetails } from "../popups/IngredientDetails"
import { Modal } from "../modal/modal"
import { fetchIngredients } from "../../store/slices/ingredientsSlice"
import { BASE_URL } from "../../utils/constants"
import { OrderInfo } from "../orderInfo/OrderInfo"
import { OrdersHistory } from "../orders-history/ordersHistory"
import { Account } from "../Account/Account"

function App() {
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const background = location.state && location.state.background

  const handleModalClose = useCallback(() => {
    navigate(-1)
  }, [navigate])

  useEffect(() => {
    dispatch(checkAuth())
    dispatch(fetchIngredients(`${BASE_URL}/ingredients`))
  }, [dispatch])

  return (
    <>
      <Routes location={background || location}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Constructor />} />
          <Route
            path="profile/*"
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          >
            <Route exact index element={<Account />} />
            <Route path="orders" element={<OrdersHistory />} />
          </Route>
          <Route
            path="profile/orders/:id"
            element={
              <RequireAuth>
                <OrderInfo />
              </RequireAuth>
            }
            state={{ background: false }}
          />
          <Route path="login/">
            <Route index element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="reset-password" element={<ResetPassword />} />
          </Route>
          <Route path="/ingredients/:id" element={<IngredientDetails />} state={{ background: false }} />
          <Route path="/feed" element={<Feed />} />
          <Route path="feed/:id" element={<OrderInfo />} state={{ background: false }} />
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
