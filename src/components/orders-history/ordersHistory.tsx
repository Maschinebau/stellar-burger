import { useEffect } from "react"
import { Order } from "../order/Order"
import { Spinner } from "../spinner/spinner"
import styles from "./ordersHistory.module.css"
import { fetchUserOrders } from "../../store/slices/userSlice"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../../store/rootReducer"

export const OrdersHistory = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchUserOrders())
  }, [dispatch])

  const orders = useSelector((state: RootState) => state.user.userOrders)

  return (
    <ul className={`${styles.wrapper} custom-scroll`}>
      {orders ? (
        orders.map((order, index) => (
          <Order
            key={`${order._id} - ${index}`}
            order={order}
            statusInfo={true}
            link={`/profile/orders/${order._id}`}
          />
        ))
      ) : (
        <Spinner />
      )}
    </ul>
  )
}
