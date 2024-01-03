import { useEffect } from "react"
import { Order } from "../order/Order"
import { Spinner } from "../spinner/spinner"
import styles from "./ordersHistory.module.css"
import { fetchUserOrders } from "../../store/slices/userSlice"
import { useAppDispatch } from "../hooks/useAppDispatch"
import { useAppSelector } from "../hooks/useAppSelector"

export const OrdersHistory = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchUserOrders())
  }, [dispatch])

  const orders = useAppSelector((state) => state.user.userOrders)

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
