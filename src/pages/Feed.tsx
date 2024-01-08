import { useEffect } from "react"
import styles from "./pages.module.css"
import { Spinner } from "../components/spinner/spinner"
import { Order } from "../components/order/Order"
import { useAppDispatch } from "../components/hooks/useAppDispatch"
import { useAppSelector } from "../components/hooks/useAppSelector"
import { WS_URL } from "../utils/constants"
import { webSocketConnect, webSocketDisconnect } from "../store/middleware/webSocketActions"

export const Feed = () => {
  const dispatch = useAppDispatch()
  const orders = useAppSelector((state) => state.allOrders.orders)
  const ordersTotal = useAppSelector((state) => state.allOrders.total)
  const ordersToday = useAppSelector((state) => state.allOrders.totalToday)

  useEffect(() => {
    dispatch(webSocketConnect({ url: `${WS_URL}/orders/all`, actionType: "ORDERS" }))
    return () => {
      dispatch(webSocketDisconnect())
    }
  }, [dispatch])

  return (
    <section className={styles.feed}>
      {orders && ordersTotal && ordersToday ? (
        <>
          <div className={styles.orders}>
            <p className="text text_type_main-large">Лента заказов</p>
            <ul className={`${styles.ordersFeed} custom-scroll`}>
              {orders ? (
                orders.map((order) => (
                  <Order key={order.number} order={order} statusInfo={false} link={`/feed/${order._id}`} />
                ))
              ) : (
                <Spinner />
              )}
            </ul>
          </div>
          <div className={styles.info}>
            <div className={styles.wrapper}>
              <div className={styles.status}>
                <p className="text text_type_main-default">Готовы:</p>
                <ul className={styles.ready}>
                  {orders ? (
                    orders.slice(0, 10).map((order) => {
                      if (order.status === "done") {
                        return (
                          <li
                            key={order.number}
                            className="text text_type_digits-default"
                            style={{ color: "#00CCCC" }}
                          >
                            {order.number}
                          </li>
                        )
                      }
                    })
                  ) : (
                    <Spinner />
                  )}
                </ul>
              </div>
              <div className={styles.status}>
                <p className="text text_type_main-default">В работе:</p>
                <ul className={styles.ready}>
                  {orders ? (
                    orders.slice(0, 10).map((order) => {
                      if (order.status === "pending") {
                        return (
                          <li key={order.number} className="text text_type_digits-default">
                            {order.number}
                          </li>
                        )
                      }
                    })
                  ) : (
                    <Spinner />
                  )}
                </ul>
              </div>
            </div>
            <div className={styles.allOrders}>
              <p className="text text_type_digits-default">Выполнено за все время:</p>
              <p className={`${styles.textLarge} text text_type_digits-large`}>{ordersTotal}</p>
            </div>
            <div className={styles.allOrders}>
              <p className="text text_type_digits-default">Выполнено за сегодня:</p>
              <p className={`${styles.textLarge} text text_type_digits-large`}>{ordersToday}</p>
            </div>
          </div>
        </>
      ) : (
        <Spinner />
      )}
    </section>
  )
}
