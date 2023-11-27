import { getOrders } from "../store/slices/allOrdersSlise"
import { useEffect } from "react"
import styles from "./pages.module.css"
import { useDispatch, useSelector } from "react-redux"
import { Spinner } from "../components/spinner/spinner"
import { Order } from "../components/order/Order"

export const Feed = () => {
  const dispatch = useDispatch()
  const orders = useSelector((state) => state.allOrders.orders)
  const ordersTotal = useSelector((state) => state.allOrders.total)
  const ordersToday = useSelector((state) => state.allOrders.totalToday)

  useEffect(() => {
    dispatch(getOrders())
  }, [dispatch])

  return (
    <section className={styles.feed}>
      {orders && ordersTotal && ordersToday ? (
        <>
          <div className={styles.orders}>
            <p className="text text_type_main-large">Лента заказов</p>
            <ul className={`${styles.ordersFeed} custom-scroll`}>
              {orders ? (
                orders.map((order) => <Order key={order.number} order={order} link={`/feed/${order._id}`} />)
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
