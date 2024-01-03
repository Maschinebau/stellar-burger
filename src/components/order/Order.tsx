import styles from "./order.module.css"
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components"
import { memo, useCallback, useMemo } from "react"
import { Link, useLocation } from "react-router-dom"
import { TOrder } from "../../utils/types"
import { useAppSelector } from "../hooks/useAppSelector"

type TOrderComponent = {
  order: TOrder
  statusInfo: boolean
  link: string
}

export const Order = memo(({ order, statusInfo, link }: TOrderComponent) => {
  const baseIngredients = useAppSelector((state) => state.ingredients.ingredients)
  const location = useLocation()

  const getIngredientImage = useMemo(() => {
    return (ingredientId: string) => {
      const ingredient = baseIngredients.find((item) => item._id === ingredientId)
      return ingredient ? ingredient.image_mobile : ""
    }
  }, [baseIngredients])

  const getPrice = useCallback(() => {
    const matchingIngredients = baseIngredients.filter((ingredient) => order.ingredients.includes(ingredient._id))
    const total = matchingIngredients.reduce((acc, ingredient) => acc + ingredient.price, 0)
    return total
  }, [baseIngredients, order.ingredients])

  const totalPrice = getPrice()

  return (
    <li className={styles.order}>
      <Link state={{ background: location }} to={link} className={styles.link}>
        <div className={styles.orderInfo}>
          <p className="text text_type_digits-default"># {order.number}</p>
          <FormattedDate
            date={new Date(order.createdAt)}
            className={"text text_type_main-default text_color_inactive"}
          />
        </div>
        <div>
          <p className="text_type_main-medium">{order.name}</p>
          {statusInfo &&
            (order.status === "done" ? (
              <p className={`${styles.textGreen} text text_type_main-default style`}>выполнен</p>
            ) : (
              <p className="text text_type_main-default">готовится</p>
            ))}
        </div>
        <div className={styles.ingredientsWrapper}>
          <ul className={styles.ingredients}>
            {order.ingredients.slice(0, 6).map((ingredientId, index) => (
              <li key={`${ingredientId}-${index}`} className={styles.ingredient}>
                <img className={styles.img} src={getIngredientImage(ingredientId)} alt="ингредиент" />
              </li>
            ))}
          </ul>
          <div className={styles.summary}>
            <p className="text text_type_digits-default">{totalPrice}</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </Link>
    </li>
  )
})

export default memo(Order)
