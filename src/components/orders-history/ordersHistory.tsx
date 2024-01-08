import { useEffect } from "react"
import { Order } from "../order/Order"
import { Spinner } from "../spinner/spinner"
import styles from "./ordersHistory.module.css"
import { useAppDispatch } from "../hooks/useAppDispatch"
import { useAppSelector } from "../hooks/useAppSelector"
import { getCookie } from "../../utils/api"
import { WS_URL } from "../../utils/constants"
import { webSocketConnect, webSocketDisconnect } from "../../store/middleware/webSocketActions"

export const OrdersHistory = () => {
  const dispatch = useAppDispatch()
  const accessToken = getCookie("accessToken")?.replace("Bearer ", "")

  useEffect(() => {
    dispatch(
      webSocketConnect({
        url: `${WS_URL}/orders?token=${accessToken}`,
        actionType: "USER_ORDERS"
      })
    )

    return () => {
      dispatch(webSocketDisconnect())
    }
  }, [dispatch, accessToken])

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
