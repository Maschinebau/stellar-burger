import { useEffect } from "react"
import { Order } from "../order/Order"
import { Spinner } from "../spinner/spinner"
import styles from "./ordersHistory.module.css"
import { fetchUserOrders, updateUserOrders } from "../../store/slices/userSlice"
import { useAppDispatch } from "../hooks/useAppDispatch"
import { useAppSelector } from "../hooks/useAppSelector"
import { getCookie } from "../../utils/api"
import { WS_URL } from "../../utils/constants"
import { useSocket } from "../hooks/useSocket"

export const OrdersHistory = () => {
  const dispatch = useAppDispatch()
  const accessToken = getCookie("accessToken")?.replace("Bearer ", "")

  useSocket(`${WS_URL}/orders?token=${accessToken}`, (event) => {
    const data = JSON.parse(event.data)
    dispatch(updateUserOrders({ orders: data.orders }))
  })

  const orders = useAppSelector((state) => state.user.userOrders)

  return (
    <>
      {orders ? (
        <ul className={`${styles.wrapper} custom-scroll`}>
          {orders.map((order, index) => (
            <Order
              key={`${order._id} - ${index}`}
              order={order}
              statusInfo={true}
              link={`/profile/orders/${order._id}`}
            />
          ))}
        </ul>
      ) : (
        <Spinner />
      )}
    </>
  )
}
