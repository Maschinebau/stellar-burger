import styles from "./ordersHistory.module.css"
import { Order } from "./order/order"

export const OrdersHistory = () => {
  const orders = []

  return (
    <ul className={styles.wrapper}>
      {orders.map((order) => (
        <Order key={order.id} order={order} />
      ))}
    </ul>
  )
}
